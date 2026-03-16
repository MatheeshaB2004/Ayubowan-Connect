import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { AddToCartDto } from './dto/add-to-cart.dto';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  async getCart(userId: number) {
    let cart = await this.prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: {
            listing: {
              include: {
                vendor: {
                  select: {
                    businessName: true,
                  },
                },
                media: {
                  where: { isPrimary: true },
                  take: 1,
                },
              },
            },
          },
          orderBy: { addedAt: 'desc' },
        },
      },
    });

    if (!cart) {
      cart = await this.prisma.cart.create({
        data: { userId },
        include: {
          items: {
            include: {
              listing: { include: { media: true } },
            },
          },
        },
      });
    }

    return cart;
  }

  async addToCart(userId: number, addToCartDto: AddToCartDto) {
    const { listingId, quantity, bookingId } = addToCartDto;

    // Ensure cart exists
    let cart = await this.prisma.cart.findUnique({
      where: { userId },
    });

    if (!cart) {
      cart = await this.prisma.cart.create({
        data: { userId },
      });
    }

    // Check if item already exists in cart
    const existingItem = await this.prisma.cartItem.findFirst({
      where: {
        cartId: cart.id,
        listingId: listingId ?? undefined,
        bookingId: bookingId ?? undefined,
      },
    });

    if (existingItem) {
      return this.prisma.cartItem.update({
        where: { id: existingItem.id },
        data: {
          quantity: existingItem.quantity + quantity,
        },
      });
    }

    return this.prisma.cartItem.create({
      data: {
        cartId: cart.id,
        listingId: listingId ?? null,
        bookingId: bookingId ?? null,
        quantity,
      },
    });
  }

  async removeFromCart(userId: number, cartItemId: number) {
    const cart = await this.prisma.cart.findUnique({
      where: { userId },
    });

    if (!cart) throw new NotFoundException('Cart not found');

    const item = await this.prisma.cartItem.findFirst({
      where: {
        id: cartItemId,
        cartId: cart.id,
      },
    });

    if (!item) throw new NotFoundException('Item not found in cart');

    return this.prisma.cartItem.delete({
      where: { id: cartItemId },
    });
  }

  async clearCart(userId: number) {
    const cart = await this.prisma.cart.findUnique({
      where: { userId },
    });

    if (!cart) return;

    return this.prisma.cartItem.deleteMany({
      where: { cartId: cart.id },
    });
  }
}