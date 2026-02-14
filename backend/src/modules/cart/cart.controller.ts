import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  Req,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { AddToCartDto } from './dto/add-to-cart.dto';

import type { Request } from 'express';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  getCart(@Req() req: Request) {
    const userId = Number(req.headers['x-user-id']) || 1;
    return this.cartService.getCart(userId);
  }

  @Post()
  addToCart(@Body() addToCartDto: AddToCartDto, @Req() req: Request) {
    const userId = Number(req.headers['x-user-id']) || 1;
    return this.cartService.addToCart(userId, addToCartDto);
  }

  @Delete(':itemId')
  removeFromCart(
    @Param('itemId', ParseIntPipe) itemId: number,
    @Req() req: Request,
  ) {
    const userId = Number(req.headers['x-user-id']) || 1;
    return this.cartService.removeFromCart(userId, itemId);
  }

  @Delete()
  clearCart(@Req() req: Request) {
    const userId = Number(req.headers['x-user-id']) || 1;
    return this.cartService.clearCart(userId);
  }
}
