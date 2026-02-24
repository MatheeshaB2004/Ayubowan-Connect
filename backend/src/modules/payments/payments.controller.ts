import { Controller, Get, Post, Body } from '@nestjs/common';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Get('status')
  getStatus() {
    return this.paymentsService.getSubscriptionStatus(1);
  }

  @Post('upgrade')
  upgrade(@Body('planType') planType: 'USER' | 'VENDOR') {
    return this.paymentsService.upgradeToPro(1, planType);
  }
}