import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class PaymentsService {
  constructor(private prisma: PrismaService) { }

  private async resolveUserId(clerkUserId?: string, email?: string): Promise<number> {
    if (!clerkUserId && !email) {
      throw new BadRequestException('User ID or Email is required');
    }

    // Try 1: By clerkUserId in Vendor table
    if (clerkUserId) {
      const vendor = await this.prisma.vendor.findUnique({
        where: { clerkUserId },
        select: { userId: true },
      });
      if (vendor) return vendor.userId;
    }

    // Try 2: By placeholder email using clerkUserId
    if (clerkUserId) {
      const placeholderEmail = `clerk_${clerkUserId}@placeholder.local`;
      const user = await this.prisma.user.findFirst({
        where: { email: placeholderEmail },
        select: { id: true },
      });
      if (user) return user.id;
    }

    // Try 3: By actual email
    if (email) {
      const user = await this.prisma.user.findUnique({
        where: { email },
        select: { id: true },
      });
      if (user) return user.id;
    }

    // Try 4: Check if clerkUserId is actually a numeric ID
    if (clerkUserId) {
      const parsed = Number(clerkUserId);
      if (!isNaN(parsed) && Number.isInteger(parsed)) {
        const user = await this.prisma.user.findUnique({
          where: { id: parsed },
          select: { id: true },
        });
        if (user) return user.id;
      }
    }

    throw new BadRequestException('User not found');
  }

  async getSubscriptionStatus(clerkUserId?: string, email?: string) {
    if (!clerkUserId && !email) {
      throw new BadRequestException('User identification is required');
    }

    // If resolveUserId fails, return default un-subscribed state rather than throwing 500
    let userId: number;
    try {
      userId = await this.resolveUserId(clerkUserId, email);
    } catch {
      return {
        userId: clerkUserId || email,
        isProUser: false,
        proSubscriptionExpiry: null,
        billingCycle: null,
      };
    }

    try {
      // First check if user is a vendor
      const vendor = await this.prisma.vendor.findUnique({
        where: { userId },
        select: {
          isProUser: true,
          proSubscriptionExpiry: true,
        },
      });

      if (vendor) {
        const billingCycle = this.determineBillingCycle(vendor.proSubscriptionExpiry);
        const isExpired = vendor.proSubscriptionExpiry
          ? vendor.proSubscriptionExpiry < new Date()
          : true;

        return {
          userId,
          isProUser: vendor.isProUser && !isExpired,
          proSubscriptionExpiry: vendor.proSubscriptionExpiry?.toISOString() ?? null,
          billingCycle,
        };
      }

      // Check if user is a local tourist
      const localTourist = await this.prisma.localTourist.findUnique({
        where: { userId },
        select: {
          isProUser: true,
          proSubscriptionExpiry: true,
        },
      });

      if (localTourist) {
        const billingCycle = this.determineBillingCycle(localTourist.proSubscriptionExpiry);
        const isExpired = localTourist.proSubscriptionExpiry
          ? localTourist.proSubscriptionExpiry < new Date()
          : true;

        return {
          userId,
          isProUser: localTourist.isProUser && !isExpired,
          proSubscriptionExpiry: localTourist.proSubscriptionExpiry?.toISOString() ?? null,
          billingCycle,
        };
      }

      // User not found in either table
      return {
        userId,
        isProUser: false,
        proSubscriptionExpiry: null,
        billingCycle: null,
      };
    } catch (error) {
      console.error('Error fetching subscription status:', error);
      return {
        userId,
        isProUser: false,
        proSubscriptionExpiry: null,
        billingCycle: null,
      };
    }
  }

  private determineBillingCycle(expiryDate: Date | null): 'monthly' | 'yearly' | null {
    if (!expiryDate) return null;

    const now = new Date();
    const daysDiff = Math.ceil((expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

    // If expired → no active plan
    if (daysDiff <= 0) return null;

    // If more than 60 days remaining → yearly
    if (daysDiff > 60) return 'yearly';

    // Otherwise treat as monthly
    return 'monthly';
  }

  async upgradeToPro(userEmail: string, planType: 'USER' | 'VENDOR', cycle: 'monthly' | 'yearly', clerkUserId?: string) {
    try {
      if (!userEmail && !clerkUserId) {
        throw new BadRequestException('Email or User ID is required');
      }

      let userId: number | undefined;

      // 1. Try to find if this clerkUserId relates to a vendor
      if (clerkUserId) {
        const vendor = await this.prisma.vendor.findUnique({
          where: { clerkUserId },
          select: { userId: true },
        });
        if (vendor) {
          userId = vendor.userId;
        } else {
          // Check placeholder email
          const placeholderUser = await this.prisma.user.findFirst({
            where: { email: `clerk_${clerkUserId}@placeholder.local` },
          });
          if (placeholderUser) {
            userId = placeholderUser.id;
          }
        }
      }

      // 2. Try to find by email if we haven't found the user yet
      if (!userId && userEmail) {
        const userByEmail = await this.prisma.user.findUnique({
          where: { email: userEmail },
        });
        if (userByEmail) {
          userId = userByEmail.id;
        }
      }

      // 3. Fallback: create new user
      if (!userId) {
        const user = await this.prisma.user.create({
          data: {
            email: userEmail || `clerk_${clerkUserId}@placeholder.local`,
            fullName: (userEmail?.split('@')[0]) || 'Clerk User',
            passwordHash: 'clerk_placeholder',
            role: 'USER',
          },
        });
        userId = user.id;
      }

      const expiryDate = new Date();
      if (cycle === 'yearly') {
        expiryDate.setDate(expiryDate.getDate() + 365); // 365 days from now
      } else {
        expiryDate.setDate(expiryDate.getDate() + 30); // 30 days from now
      }

      if (planType === 'USER') {
        // Ensure LocalTourist exists first
        let tourist = await this.prisma.localTourist.findUnique({
          where: { userId },
        });

        if (!tourist) {
          // We need fullname, fetch it from User
          const dbUser = await this.prisma.user.findUnique({ where: { id: userId } });
          
          // Create minimal valid record FIRST
          tourist = await this.prisma.localTourist.create({
            data: {
              user: { connect: { id: userId } },
              fullName: dbUser?.fullName || 'Traveler',
              userType: 'LOCAL',
              preferredLanguage: 'en',
            },
          });
        }

        // THEN update subscription
        await this.prisma.localTourist.update({
          where: { userId },
          data: {
            isProUser: true,
            proSubscriptionExpiry: expiryDate,
          },
        });
      } else if (planType === 'VENDOR') {
        // Ensure Vendor exists first
        let vendor = await this.prisma.vendor.findUnique({
          where: { userId },
        });

        if (!vendor) {
          vendor = await this.prisma.vendor.create({
            data: {
              user: {
                connect: { id: userId },
              },
              businessName: 'Clerk Vendor',
              verifiedStatus: 'PENDING',
              profileComplete: false,
              isActive: true,
              quantity: 0,
              clerkUserId: clerkUserId || null,
            },
          });
        } else if (clerkUserId && !vendor.clerkUserId) {
          // Update missing clerkUserId
          await this.prisma.vendor.update({
            where: { id: vendor.id },
            data: { clerkUserId },
          });
        }

        // THEN update subscription
        await this.prisma.vendor.update({
          where: { userId },
          data: {
            isProUser: true,
            proSubscriptionExpiry: expiryDate,
          },
        });
      }

      return {
        message: 'Subscription upgraded successfully',
        userId,
        planType,
        cycle,
        isProUser: true,
        proSubscriptionExpiry: expiryDate.toISOString(),
      };
    } catch (error: any) {
      console.error('UPGRADE ERROR FULL:', error);

      throw new BadRequestException(
        error?.message || 'Upgrade failed'
      );
    }
  }

  checkout(amount: number, method: 'CARD' | 'CASH') {
    if (!amount || amount <= 0) {
      throw new BadRequestException('Invalid amount');
    }

    return {
      paymentId: `PAY_${Date.now()}`,
      status: 'SUCCESS',
      method,
      amount,
    };
  }
}