import { Controller, Get, Post, Body, Headers, BadRequestException } from '@nestjs/common';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) { }

  @Get('status')
  getStatus(@Headers('x-user-id') userId: string) {
    if (!userId) {
      throw new BadRequestException('User ID is required');
    }
    return this.paymentsService.getSubscriptionStatus(userId);
  }

  @Post('upgrade')
  upgrade(
    @Body('planType') planType: 'USER' | 'VENDOR',
    @Body('cycle') cycle: 'monthly' | 'yearly',
    @Headers('x-user-id') userId: string
  ) {
    if (!userId) {
      throw new BadRequestException('User ID is required');
    }
    return this.paymentsService.upgradeToPro(userId, planType, cycle);
  }
}