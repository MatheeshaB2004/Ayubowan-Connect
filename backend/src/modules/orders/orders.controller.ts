import {
  Body,
  Controller,
  Get,
  Headers,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Get()
  async getUserOrders(@Headers('x-user-id') userId: string) {
    if (!userId) {
      throw new UnauthorizedException('Missing x-user-id header');
    }
    return this.ordersService.getUserOrders(userId);
  }

  @Post('complete')
  async completeOrder(
    @Headers('x-user-id') userId: string,
    @Body()
    body: {
      cartItems?: Array<{
        listingId?: number | null;
        quantity?: number;
        listing?: { listingType?: string } | null;
      }>;
    },
  ) {
    if (!userId) {
      throw new UnauthorizedException('Missing x-user-id header');
    }
    return this.ordersService.completeOrder(userId, body?.cartItems ?? []);
  }
}
