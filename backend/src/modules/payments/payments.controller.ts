import { Controller, Get, Post, Body, Headers, BadRequestException } from '@nestjs/common';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) { }

  @Get('status')
  getStatus(@Headers('x-user-id') userId: string, @Headers('x-user-email') email: string) {
    if (!email && !userId) {
      throw new BadRequestException('Email or User ID is required');
    }
    return this.paymentsService.getSubscriptionStatus(userId, email);
  }

  @Post('upgrade')
  upgrade(
    @Body('planType') planType: 'USER' | 'VENDOR',
    @Body('cycle') cycle: 'monthly' | 'yearly',
    @Body('email') email: string,
    @Headers('x-user-id') userId: string
  ) {
    if (!email) {
      throw new BadRequestException('Email is required');
    }
    return this.paymentsService.upgradeToPro(email, planType, cycle, userId);
  }
}