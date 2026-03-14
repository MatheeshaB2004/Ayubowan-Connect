import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class BookingService {
  private readonly logger = new Logger(BookingService.name);

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

  async createBooking(
    rawUserId: string,
    data: {
      listingId: number | string;
      date: string;
      participants: number | string;
      notes?: string;
    },
  ) {
    // --- resolve identifiers ------------------------------------------------
    const userId = await this.resolveUserId(rawUserId);
    const listingId = Number(data.listingId);
    const guests = Number(data.participants) || 1;

    if (!listingId || isNaN(listingId)) {
      throw new BadRequestException('Invalid listingId');
    }

    // --- fetch listing -------------------------------------------------------
    const listing = await this.prisma.listing.findUnique({
      where: { id: listingId },
    });

    if (!listing) {
      throw new NotFoundException('Listing not found');
    }

    // --- create the booking --------------------------------------------------
    try {
      const booking = await this.prisma.booking.create({
        data: {
          localTourist: { connect: { userId } },
          listing: { connect: { id: listingId } },
          vendor: { connect: { id: listing.vendorId } },
          bookingDate: new Date(data.date),
          guests,
          totalPrice: listing.priceMin * guests,
          notes: data.notes || null,
          status: 'PENDING',
        },
      });

      this.logger.log(`Booking ${booking.id} created for userId=${userId}`);
      return booking;
    } catch (error) {
      this.logger.error('Failed to create booking', error);
      throw error;
    }
  }

  async updateBookingStatus(bookingId: number, status: string, rawUserId: string) {
    const userId = await this.resolveUserId(rawUserId);
    const booking = await this.prisma.booking.findUnique({
      where: { id: bookingId },
    });
    if (!booking) throw new NotFoundException('Booking not found');
    if (booking.localTouristId !== userId) {
      throw new BadRequestException('Not authorized');
    }
    return this.prisma.booking.update({
      where: { id: bookingId },
      data: { status: status as any },
    });
  }

  async getUserBookings(rawUserId: string) {
    const userId = await this.resolveUserId(rawUserId);

    return this.prisma.booking.findMany({
      where: {
        localTouristId: userId,
      },
      include: {
        listing: true,
        vendor: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}