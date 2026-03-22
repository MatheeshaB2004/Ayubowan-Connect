import {
  Body,
  Controller,
  Get,
  Post,
  Headers,
  BadRequestException,
} from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Get()
  async getUserOrders(@Headers('x-user-email') email: string) {
    if (!email) {
      throw new BadRequestException('Email is required');
    }
    return this.ordersService.getUserOrders(email);
  }

  @Post('complete')
  async completeOrder(
    @Headers('x-user-email') email: string,
    @Body()
    body: {
      cartItems?: Array<{
        listingId?: number | null;
        quantity?: number;
        listing?: { listingType?: string } | null;
      }>;
    },
  ) {
    if (!email) {
      throw new BadRequestException('Email is required');
    }
    return this.ordersService.completeOrder(email, body?.cartItems ?? []);
  }
}
