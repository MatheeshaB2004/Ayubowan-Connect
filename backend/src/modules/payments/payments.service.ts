import { Injectable } from '@nestjs/common';

@Injectable()
export class PaymentsService {
  getSubscriptionStatus(userId: number) {
    return {
      userId,
      isProUser: false,
      expiry: null,
    };
  }

  upgradeToPro(userId: number) {
    return {
      message: 'Subscription upgraded (simulated)',
      userId,
      isProUser: true,
    };
  }
}
