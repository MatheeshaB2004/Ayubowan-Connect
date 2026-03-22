import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class PaymentsService {
  constructor(private prisma: PrismaService) { }

  private async resolveUserId(rawUserId: string): Promise<number> {
    if (!rawUserId) {
      throw new BadRequestException('User ID is required');
    }

    // Try 1: Check if it's an email
    if (rawUserId.includes('@')) {
      const user = await this.prisma.user.findUnique({
        where: { email: rawUserId },
      });
      if (user) return user.id;
    }

    // Try 2: Check by clerkUserId (vendor table)
    const vendor = await this.prisma.vendor.findUnique({
      where: { clerkUserId: rawUserId },
      select: { userId: true },
    });
    if (vendor) return vendor.userId;

    // Try 3: Check placeholder emails
    const placeholderEmail = `clerk_${rawUserId}@placeholder.local`;
    const user = await this.prisma.user.findFirst({
      where: { email: placeholderEmail },
      select: { id: true },
    });
    if (user) return user.id;

    // Try 4: Check if it's a numeric ID
    const parsed = Number(rawUserId);
    if (!isNaN(parsed) && Number.isInteger(parsed)) {
      const user = await this.prisma.user.findUnique({
        where: { id: parsed },
        select: { id: true },
      });
      if (user) return user.id;
    }

    throw new BadRequestException('User not found');
  }

  async getSubscriptionStatus(email: string) {
    if (!email) {
      throw new BadRequestException('Email is required');
    }

    const userId = await this.resolveUserId(email);

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

  async upgradeToPro(userEmail: string, planType: 'USER' | 'VENDOR', cycle: 'monthly' | 'yearly') {
    try {
      if (!userEmail) {
        throw new BadRequestException('Email is required');
      }

      // FIX: USE USER EMAIL TO FIND EXISTING USER
      const user = await this.prisma.user.findUnique({
        where: { email: userEmail },
      });

      if (!user) {
        throw new Error('User not found');
      }

      const userId = user.id;

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
          // Create minimal valid record FIRST
          tourist = await this.prisma.localTourist.create({
            data: {
              user: { connect: { id: userId } },
              fullName: user.fullName,
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
            },
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