import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class OrdersService {
  private readonly logger = new Logger(OrdersService.name);

  constructor(private prisma: PrismaService) {}

  /**
   * Resolve a Clerk user ID (string) or numeric user ID to the actual
   * numeric database user ID.
   */
  private async resolveUserId(rawId: string): Promise<number> {
    const parsed = Number(rawId);
    if (!isNaN(parsed) && Number.isInteger(parsed)) {
      return parsed;
    }

    // Clerk ID – look up DB user by placeholder email
    const user = await this.prisma.user.findFirst({
      where: { email: `clerk_${rawId}@placeholder.local` },
    });

    if (!user) {
      throw new NotFoundException(
        `No database user found for Clerk ID "${rawId}". ` +
          'The user may not have completed registration.',
      );
    }

    return user.id;
  }

  /**
   * Return completed orders for the given user.
   *
   * Since no dedicated Order table exists, we query the Booking table
   * for bookings with status COMPLETED or CONFIRMED and map them into
   * the shape the frontend expects.
   */
  async getUserOrders(rawUserId: string) {
    const userId = await this.resolveUserId(rawUserId);

    const bookings = await this.prisma.booking.findMany({
      where: {
        localTouristId: userId,
        status: { in: ['COMPLETED', 'CONFIRMED'] },
      },
      include: {
        listing: true,
        vendor: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return bookings.map((b) => ({
      id: b.id,
      itemName: b.listing?.title ?? 'Unknown Item',
      vendorName: b.vendor?.businessName ?? 'Unknown Vendor',
      orderDate: b.bookingDate,
      amount: b.totalPrice,
      status: b.status === 'COMPLETED' ? 'COMPLETED' : 'PAID',
    }));
  }
}
