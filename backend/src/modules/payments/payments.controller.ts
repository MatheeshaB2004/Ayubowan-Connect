import { Controller, Get, Post } from '@nestjs/common';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Get('status')
  getStatus() {
    return this.paymentsService.getSubscriptionStatus(1);
  }

  @Post('upgrade')
  upgrade() {
    return this.paymentsService.upgradeToPro(1);
  }
}
