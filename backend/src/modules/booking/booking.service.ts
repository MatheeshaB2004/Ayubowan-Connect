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

  constructor(private prisma: PrismaService) { }

  /**
   * Resolve user ID with safe matching (email + ID fallbacks).
   * Uses email first, then clerkUserId, then placeholder, then numeric ID.
   */
  private async resolveUserId(rawUserId: string): Promise<number> {
    if (!rawUserId) {
      throw new Error('Missing user ID');
    }
    this.logger.log(`RAW USER ID: ${rawUserId}`);

    // Try 1: Check if it's an email
    if (rawUserId.includes('@')) {
      const user = await this.prisma.user.findUnique({
        where: { email: rawUserId },
        include: { localTourist: true },
      });
      if (user) {
        this.logger.log(`FOUND USER BY EMAIL: ${user.id} - ${user.email}`);
        if (!user.localTourist) return -1;
        return user.localTourist.userId;
      }
    }

    // Try 2: Check placeholder emails
    const placeholderEmail = `clerk_${rawUserId}@placeholder.local`;
    let user = await this.prisma.user.findFirst({
      where: { email: placeholderEmail },
      include: { localTourist: true },
    });
    if (user) {
      this.logger.log(`FOUND USER BY PLACEHOLDER: ${user.id} - ${user.email}`);
      if (!user.localTourist) return -1;
      return user.localTourist.userId;
    }

    // Try 3: Check by clerkUserId (vendor table)
    const vendor = await this.prisma.vendor.findUnique({
      where: { clerkUserId: rawUserId },
      select: { userId: true },
    });
    if (vendor) {
      this.logger.log(`FOUND VENDOR BY CLERK ID: ${vendor.userId}`);
      return vendor.userId;
    }

    // Try 4: Check if it's a numeric ID
    const parsed = Number(rawUserId);
    if (!isNaN(parsed) && Number.isInteger(parsed)) {
      user = await this.prisma.user.findUnique({
        where: { id: parsed },
        include: { localTourist: true },
      });
      if (user) {
        this.logger.log(`FOUND USER BY NUMERIC ID: ${user.id} - ${user.email}`);
        if (!user.localTourist) return -1;
        return user.localTourist.userId;
      }
    }

    throw new Error(`User not found for: ${rawUserId}`);
  }

  /**
   * Return availability dates + slots for a given listing.
   * This is a read-only query — no mutations.
   */
  async getListingAvailability(listingId: number) {
    const listing = await this.prisma.listing.findUnique({
      where: { id: listingId },
      select: { vendorId: true },
    });

    if (!listing) {
      throw new NotFoundException('Listing not found');
    }

    const records = await this.prisma.vendorAvailability.findMany({
      where: {
        vendorId: listing.vendorId,
        slots: {
          some: {
            listingId,
          },
        },
      },
      include: {
        slots: {
          where: {
            listingId,
          },
        },
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

    if (userId === -1) {
      throw new BadRequestException('User is not a local tourist');
    }
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
    try {
      const userId = await this.resolveUserId(rawUserId);

      if (!userId) {
        return [];
      }

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
    } catch (error) {
      console.error('BookingsService error:', error);
      return [];
    }
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

  async getBookingById(id: number, email: string) {
    const userId = await this.resolveUserId(email);
    
    const booking = await this.prisma.booking.findFirst({
      where: {
        id,
        localTouristId: userId,
      },
      include: {
        listing: true,
      },
    });

    if (!booking || !booking.slotId) {
      return booking;
    }

    const slot = await this.prisma.availabilitySlot.findUnique({
      where: { id: booking.slotId },
    });

    return {
      ...booking,
      slot,
    };
  }
}