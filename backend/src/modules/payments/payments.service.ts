import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class PaymentsService {
  constructor(private prisma: PrismaService) { }

  private async resolveUserId(rawUserId: string): Promise<number> {
    const parsed = Number(rawUserId);

    // Case 1: already numeric userId
    if (!isNaN(parsed) && Number.isInteger(parsed)) {
      return parsed;
    }

    // Case 2: Clerk userId → find vendor
    const vendor = await this.prisma.vendor.findUnique({
      where: { clerkUserId: rawUserId },
      select: { userId: true },
    });

    if (vendor) return vendor.userId;

    // Case 3: fallback → find user by placeholder email
    const placeholderEmail = `clerk_${rawUserId}@placeholder.local`;

    const user = await this.prisma.user.findFirst({
      where: { email: placeholderEmail },
      select: { id: true },
    });

    if (user) return user.id;

    throw new Error('User not found for given Clerk ID');
  }

  async getSubscriptionStatus(rawUserId: string) {
    if (!rawUserId) {
      throw new BadRequestException('Invalid user');
    }

    const userId = await this.resolveUserId(rawUserId);

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

  async upgradeToPro(rawUserId: string, planType: 'USER' | 'VENDOR', cycle: 'monthly' | 'yearly') {
    if (!rawUserId) {
      throw new BadRequestException('Invalid user');
    }

    const userId = await this.resolveUserId(rawUserId);

    const expiryDate = new Date();
    if (cycle === 'yearly') {
      expiryDate.setDate(expiryDate.getDate() + 365); // 365 days from now
    } else {
      expiryDate.setDate(expiryDate.getDate() + 30); // 30 days from now
    }

    if (planType === 'USER') {
      // Update LocalTourist
      await this.prisma.localTourist.update({
        where: { userId },
        data: {
          isProUser: true,
          proSubscriptionExpiry: expiryDate,
        },
      });
    } else if (planType === 'VENDOR') {
      // Update Vendor
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