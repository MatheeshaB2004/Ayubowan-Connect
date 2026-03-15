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
   * Only works with existing User records - does NOT create placeholder users.
   */
  private async resolveUserId(clerkUserId: string): Promise<number> {
    if (!clerkUserId) {
      throw new Error('Missing Clerk user ID');
    }

    let user = await this.prisma.user.findFirst({
      where: {
        email: {
          contains: clerkUserId,
        },
      },
      include: {
        localTourist: true,
      },
    });

    if (!user) {
      user = await this.prisma.user.findFirst({
        where: {
          localTourist: {
            isNot: null,
          },
        },
        include: {
          localTourist: true,
        },
      });
    }

    if (!user || !user.localTourist) {
      throw new Error('User profile not found.');
    }

    return user.localTourist.userId;
  }

  // ─── Public Availability (read-only) ─────────────────────────────────────

  /**
   * Return availability dates + slots for a given vendor.
   * This is a read-only query — no mutations.
   */
  async getVendorAvailability(vendorId: number) {
    const records = await this.prisma.vendorAvailability.findMany({
      where: {
        vendorId,
      },
      include: {
        slots: true,
      },
      orderBy: { date: 'asc' },
    });

    return records.map((r) => ({
      date: r.date.toISOString().split('T')[0],
      slots: r.slots.map((s) => ({
        id: s.id,
        startTime: s.startTime.toISOString().slice(11, 16),
        endTime: s.endTime.toISOString().slice(11, 16),
        maxGuests: s.maxGuests,
        bookedGuests: s.bookedGuests,
      })),
    }));
  }

  // ─── Booking CRUD ────────────────────────────────────────────────────────

  async createBooking(
    rawUserId: string,
    data: {
      listingId: number | string;
      date: string;
      participants: number | string;
      slotId?: number | string;
      notes?: string;
    },
  ) {
    // --- resolve identifiers ------------------------------------------------
    const userId = await this.resolveUserId(rawUserId);
    const listingId = Number(data.listingId);
    const guests = Number(data.participants) || 1;
    const slotId = data.slotId ? Number(data.slotId) : null;

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

    // --- validate slot capacity (read-only check) ----------------------------
    if (slotId) {
      const slot = await this.prisma.availabilitySlot.findUnique({
        where: { id: slotId },
      });
      if (!slot) {
        throw new NotFoundException('Availability slot not found');
      }
      if (slot.bookedGuests + guests > slot.maxGuests) {
        throw new BadRequestException(
          `Not enough capacity. Only ${slot.maxGuests - slot.bookedGuests} spots remaining.`,
        );
      }
    }

    // --- create the booking (status = PENDING) -------------------------------
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
          slotId: slotId,
          status: 'PENDING',
        },
      });

      this.logger.log(
        `Booking ${booking.id} created for userId=${userId} (PENDING). No capacity reserved yet.`,
      );
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

    const updateData: any = { status: status as any };

    if (status === 'CONFIRMED' && booking.status !== 'CONFIRMED') {
      updateData.approvedAt = new Date();
      if (booking.slotId) {
        await this.prisma.availabilitySlot.update({
          where: { id: booking.slotId },
          data: { bookedGuests: { increment: booking.guests } },
        });
      }
      this.logger.log(`Booking ${bookingId} CONFIRMED — reserved capacity`);
    } else if (status === 'REJECTED' || status === 'CANCELLED') {
      if (booking.status === 'CONFIRMED' && booking.slotId) {
        await this.prisma.availabilitySlot.update({
          where: { id: booking.slotId },
          data: { bookedGuests: { decrement: booking.guests } },
        });
        this.logger.log(`Booking ${bookingId} ${status} — freed capacity`);
      }
      if (status === 'REJECTED') {
        updateData.rejectedAt = new Date();
      }
    }

    return this.prisma.booking.update({
      where: { id: bookingId },
      data: updateData,
    });
  }

  async getUserBookings(rawUserId: string) {
    const userId = await this.resolveUserId(rawUserId);

    const bookings = await this.prisma.booking.findMany({
      where: {
        localTouristId: userId,
      },
      include: {
        listing: {
          include: {
            vendor: true,
          },
        },
        vendor: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const slotIds = bookings
      .map((b) => b.slotId)
      .filter((id) => id !== null) as number[];
    const slots =
      slotIds.length > 0
        ? await this.prisma.availabilitySlot.findMany({
            where: { id: { in: slotIds } },
          })
        : [];

    const slotMap = new Map(slots.map((s) => [s.id, s]));

    return bookings.map((b) => ({
      ...b,
      slot: b.slotId ? slotMap.get(b.slotId) : null,
    }));
  }

  async getVendorBookings(vendorId: number) {
    // Fetch all bookings for this vendor
    const bookings = await this.prisma.booking.findMany({
      where: {
        vendorId,
      },
      include: {
        listing: true,
        localTourist: {
          include: {
            user: {
              select: {
                fullName: true,
                email: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const slotIds = bookings
      .map((b) => b.slotId)
      .filter((id) => id !== null) as number[];
    const slots =
      slotIds.length > 0
        ? await this.prisma.availabilitySlot.findMany({
            where: { id: { in: slotIds } },
          })
        : [];

    const slotMap = new Map(slots.map((s) => [s.id, s]));

    return bookings.map((b) => ({
      ...b,
      slot: b.slotId ? slotMap.get(b.slotId) : null,
    }));
  }
}