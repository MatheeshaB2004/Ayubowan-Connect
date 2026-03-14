import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class OrdersService {
  private readonly logger = new Logger(OrdersService.name);

  constructor(private prisma: PrismaService) {}

  /**
   * Resolve a Clerk user ID to a numeric database userId.
   * Auto-creates User + LocalTourist records if they don't exist yet.
   */
  private async resolveUserId(rawId: string): Promise<number> {
    // If already numeric, return directly
    const parsed = Number(rawId);
    if (!isNaN(parsed) && Number.isInteger(parsed)) {
      return parsed;
    }

    // Step 1 — Check Vendor table by clerkUserId
    const vendor = await this.prisma.vendor.findUnique({
      where: { clerkUserId: rawId },
    });
    if (vendor) {
      this.logger.log(`Resolved Clerk ID "${rawId}" via vendor → userId=${vendor.userId}`);
      return vendor.userId;
    }

    // Step 2 — Look for existing User created by registration
    const placeholderEmail = `clerk_${rawId}@placeholder.local`;
    let userId: number;

    const existingUser = await this.prisma.user.findFirst({
      where: { email: placeholderEmail },
    });

    if (existingUser) {
      userId = existingUser.id;
      this.logger.log(`Resolved Clerk ID "${rawId}" via placeholder email → userId=${userId}`);
    } else {
      // Step 3 — Create a new User record
      const newUser = await this.prisma.user.create({
        data: {
          fullName: 'Clerk User',
          email: placeholderEmail,
          passwordHash: 'clerk-auth',
        },
      });
      userId = newUser.id;
      this.logger.log(`Auto-created User for Clerk ID "${rawId}" → userId=${userId}`);
    }

    // Step 4 — Ensure LocalTourist record exists
    const tourist = await this.prisma.localTourist.findUnique({
      where: { userId },
    });
    if (!tourist) {
      await this.prisma.localTourist.create({
        data: {
          userId,
          fullName: 'Clerk User',
          userType: 'LOCAL',
        },
      });
      this.logger.log(`Auto-created LocalTourist for userId=${userId}`);
    }

    // Step 5
    return userId;
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
