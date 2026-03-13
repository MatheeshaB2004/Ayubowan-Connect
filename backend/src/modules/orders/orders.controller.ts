import { Controller, Get, Headers } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Get()
  async getUserOrders(@Headers('x-user-id') userId: string) {
    return this.ordersService.getUserOrders(userId);
  }
}
