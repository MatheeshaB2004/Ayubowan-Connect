import { Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class PaymentsService {
  getSubscriptionStatus(userId: number) {
    if (!userId) {
      throw new BadRequestException('Invalid user');
    }

    return {
      userId,
      isProUser: false,
      proSubscriptionExpiry: null,
    };
  }

  upgradeToPro(userId: number, planType: 'USER' | 'VENDOR') {
    if (!userId) {
      throw new BadRequestException('Invalid user');
    }

    return {
      message: 'Subscription upgraded successfully (simulated)',
      userId,
      planType,
      isProUser: true,
      proSubscriptionExpiry: '2026-03-01',
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