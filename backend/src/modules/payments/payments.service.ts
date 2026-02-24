import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '../../../prisma/generated/prisma';

@Injectable()
export class PaymentsService {
  private prisma = new PrismaClient();

  async getSubscriptionStatus(userId: number) {
    const tourist = await this.prisma.localTourist.findUnique({
      where: { userId },
    });

    if (!tourist) {
      throw new NotFoundException('Local tourist not found');
    }

    return {
      userId,
      isProUser: tourist.isProUser,
      proSubscriptionExpiry: tourist.proSubscriptionExpiry,
    };
  }

  async upgradeToPro(userId: number, planType: 'USER' | 'VENDOR') {
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + 30); // 30-day subscription

    const updated = await this.prisma.localTourist.update({
      where: { userId },
      data: {
        isProUser: true,
        proSubscriptionExpiry: expiry,
      },
    });

    return {
      message: 'Subscription upgraded successfully (simulated)',
      planType,
      isProUser: updated.isProUser,
      proSubscriptionExpiry: updated.proSubscriptionExpiry,
    };
  }
}