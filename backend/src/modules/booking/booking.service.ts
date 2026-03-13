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
   * Resolve a Clerk user ID (string) or numeric user ID to the actual
   * numeric database user ID.
   *
   * - If the value is already a valid integer string, use it directly.
   * - Otherwise treat it as a Clerk ID and look up the User record
   *   via the `clerk_<id>@placeholder.local` email convention used by
   *   the vendor-management module during registration.
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

    // --- ensure a LocalTourist record exists for this user -------------------
    const tourist = await this.prisma.localTourist.findUnique({
      where: { userId },
    });

    if (!tourist) {
      // Auto-create a minimal LocalTourist profile so the booking can proceed.
      const dbUser = await this.prisma.user.findUnique({ where: { id: userId } });
      await this.prisma.localTourist.create({
        data: {
          userId,
          fullName: dbUser?.fullName ?? 'Guest',
          userType: 'TOURIST',
        },
      });
      this.logger.log(`Auto-created LocalTourist record for userId=${userId}`);
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