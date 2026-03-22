import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateEventDto } from './dto/create-event.dto';
import { EventQueryDto } from './dto/event-query.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}

  private getTodayDateString(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  private parseTimeFromRange(
    rawTime: string,
    useLastMatch: boolean,
  ): { hour: number; minute: number } | null {
    const twelveHourMatches = [
      ...rawTime.matchAll(/(\d{1,2}):(\d{2})\s*(AM|PM)/gi),
    ];
    if (twelveHourMatches.length > 0) {
      const match = useLastMatch
        ? twelveHourMatches[twelveHourMatches.length - 1]
        : twelveHourMatches[0];

      let hour = Number(match[1]);
      const minute = Number(match[2]);
      const meridiem = match[3].toUpperCase();

      if (meridiem === 'PM' && hour !== 12) hour += 12;
      if (meridiem === 'AM' && hour === 12) hour = 0;

      return { hour, minute };
    }

    const twentyFourHourMatches = [...rawTime.matchAll(/(\d{1,2}):(\d{2})/g)];
    if (twentyFourHourMatches.length > 0) {
      const match = useLastMatch
        ? twentyFourHourMatches[twentyFourHourMatches.length - 1]
        : twentyFourHourMatches[0];

      const hour = Number(match[1]);
      const minute = Number(match[2]);

      if (hour >= 0 && hour <= 23 && minute >= 0 && minute <= 59) {
        return { hour, minute };
      }
    }

    return null;
  }

  private getEventStartDateTime(startDate: Date, time?: string | null): Date {
    const eventStart = new Date(startDate);

    if (!time) return eventStart;

    const parsed = this.parseTimeFromRange(time, false);
    if (parsed) {
      eventStart.setHours(parsed.hour, parsed.minute, 0, 0);
    }

    return eventStart;
  }

  private getEventEndDateTime(
    startDate: Date,
    endDate?: Date | null,
    time?: string | null,
  ): Date {
    const eventEnd = new Date(endDate ?? startDate);

    if (!time) {
      // If time is missing, treat event as ending at end of the day.
      eventEnd.setHours(23, 59, 59, 999);
      return eventEnd;
    }

    const parsed = this.parseTimeFromRange(time, true);
    if (parsed) {
      eventEnd.setHours(parsed.hour, parsed.minute, 0, 0);
      return eventEnd;
    }

    // Invalid time format fallback: keep event live until end of day.
    eventEnd.setHours(23, 59, 59, 999);
    return eventEnd;
  }

  private isEventLive(
    now: Date,
    startDate: Date,
    endDate?: Date | null,
    time?: string | null,
  ): boolean {
    const eventStart = this.getEventStartDateTime(startDate, time);
    const eventEnd = this.getEventEndDateTime(startDate, endDate, time);
    return now >= eventStart && now <= eventEnd;
  }

  private isEventPast(
    now: Date,
    startDate: Date,
    endDate?: Date | null,
    time?: string | null,
  ): boolean {
    const eventEnd = this.getEventEndDateTime(startDate, endDate, time);
    return now > eventEnd;
  }

  private async resolveVendorId(rawUserId: string): Promise<number> {
    const parsed = Number(rawUserId);
    if (!isNaN(parsed) && Number.isInteger(parsed)) {
      const byVendorId = await this.prisma.vendor.findUnique({
        where: { id: parsed },
        select: { id: true },
      });
      if (byVendorId) return byVendorId.id;

      const byUserId = await this.prisma.vendor.findUnique({
        where: { userId: parsed },
        select: { id: true },
      });
      if (byUserId) return byUserId.id;
    }

    const vendor = await this.prisma.vendor.findUnique({
      where: { clerkUserId: rawUserId },
      select: { id: true },
    });
    if (vendor) return vendor.id;

    throw new NotFoundException('Vendor profile not found');
  }

  private async resolveUserId(rawUserId: string, email?: string): Promise<number> {
    console.log("RAW USER ID:", rawUserId);
    console.log("EMAIL RECEIVED:", email);

    // 🔥 FORCE EMAIL LOOKUP FIRST
    if (email && email.includes('@')) {
      const user = await this.prisma.user.findFirst({
        where: {
          email: {
            equals: email,
            mode: 'insensitive',
          },
        },
      });

      if (user) {
        console.log("USER FOUND BY EMAIL:", user.id);
        return user.id;
      } else {
        console.log("NO USER FOUND FOR EMAIL:", email);
      }
    }

    // 🔥 REMOVE vendor fallback temporarily (to avoid wrong mapping)

    // fallback placeholder
    const user = await this.prisma.user.findFirst({
      where: {
        email: `${rawUserId}@placeholder.local`,
      },
    });

    if (user) {
      console.log("USER FOUND BY PLACEHOLDER:", user.id);
      return user.id;
    }

    throw new Error(`User not found for: ${rawUserId}`);
  }

  // Get all published events with optional filters
  async getAllEvents(query: EventQueryDto) {
    const { search, category, location } = query;

    const where: Prisma.EventWhereInput = {
      isPublished: true,
      status: 'PUBLISHED',
    };

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        {
          vendor: {
            businessName: { contains: search, mode: 'insensitive' },
          },
        },
      ];
    }

    if (category && category !== 'all') {
      where.category = category;
    }

    if (location && location !== 'all') {
      where.city = location;
    }

    const events = await this.prisma.event.findMany({
      where,
      include: {
        vendor: { select: { id: true, businessName: true } },
        registrations: { select: { id: true } },
      },
      orderBy: { startDate: 'asc' },
    });

    const now = new Date();
    return events.map((event) => ({
      ...event,
      participantCount: event.registrations.length,
      isLive: this.isEventLive(now, event.startDate, event.endDate, event.time),
    }));
  }

  // Get a single event by ID
  async getEventById(id: number) {
    const event = await this.prisma.event.findUnique({
      where: { id },
      include: {
        vendor: {
          select: {
            id: true,
            businessName: true,
            userId: true,
            clerkUserId: true,
          },
        },
      },
    });

    if (!event) throw new NotFoundException('Event not found');

    const now = new Date();
    const registrations = await this.prisma.eventRegistration.findMany({
      where: { eventId: id },
    });

    const galleryImages = await this.prisma.eventGalleryImage.findMany({
      where: { eventId: id },
      orderBy: { displayOrder: 'asc' },
      select: {
        id: true,
        imageUrl: true,
        displayOrder: true,
        uploadedAt: true,
      },
    });

    return {
      ...event,
      participantCount: registrations.length,
      galleryImages,
      isLive: this.isEventLive(now, event.startDate, event.endDate, event.time),
    };
  }

  // Get events created by a specific vendor
  async getVendorEvents(email: string) {
    const userId = await this.resolveUserId(email);
    const now = new Date();

    const events = await this.prisma.event.findMany({
      where: { vendorId: userId },
      include: { registrations: { select: { id: true } } },
      orderBy: { startDate: 'asc' },
    });

    return events.map((event) => {
      const isLive = this.isEventLive(
        now,
        event.startDate,
        event.endDate,
        event.time,
      );
      const isPast = this.isEventPast(
        now,
        event.startDate,
        event.endDate,
        event.time,
      );

      return {
        ...event,
        participantCount: event.registrations.length,
        isLive,
        computedStatus: isLive ? 'live' : isPast ? 'past' : 'upcoming',
      };
    });
  }

  // Get events a user has registered for
  async getUserRegisteredEvents(rawUserId: string) {
    const userId = await this.resolveUserId(rawUserId);
    const now = new Date();

    const registrations = await this.prisma.eventRegistration.findMany({
      where: { userId },
      include: {
        event: {
          include: {
            vendor: { select: { id: true, businessName: true } },
            registrations: { select: { id: true } },
          },
        },
      },
    });

    return registrations.map((r) => ({
      ...r.event,
      registrationDate: r.createdAt,
      participantCount: r.event.registrations.length,
      isLive: this.isEventLive(
        now,
        r.event.startDate,
        r.event.endDate,
        r.event.time,
      ),
    }));
  }

  // Create event (vendor only)
  async createEvent(rawUserId: string, dto: CreateEventDto) {
    const vendorId = await this.resolveVendorId(rawUserId);
    const { startDate, endDate, ...rest } = dto;
    const today = this.getTodayDateString();
    const normalizedStartDate = startDate.slice(0, 10);
    const normalizedEndDate = endDate ? endDate.slice(0, 10) : null;

    if (normalizedStartDate < today) {
      throw new BadRequestException('Start date cannot be before today');
    }

    if (normalizedEndDate && normalizedEndDate < today) {
      throw new BadRequestException('End date cannot be before today');
    }

    if (normalizedEndDate && normalizedEndDate < normalizedStartDate) {
      throw new BadRequestException(
        'End date cannot be earlier than start date',
      );
    }

    return this.prisma.event.create({
      data: {
        ...rest,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        vendorId,
      },
    });
  }

  async deleteEvent(rawUserId: string, eventId: number) {
    const vendorId = await this.resolveVendorId(rawUserId);

    const event = await this.prisma.event.findUnique({
      where: { id: eventId },
      select: {
        id: true,
        vendorId: true,
        startDate: true,
        time: true,
      },
    });

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    if (!event.vendorId || event.vendorId !== vendorId) {
      throw new ForbiddenException('You can only delete your own events');
    }

    const now = new Date();
    const eventStart = this.getEventStartDateTime(event.startDate, event.time);
    const hoursUntilStart =
      (eventStart.getTime() - now.getTime()) / (1000 * 60 * 60);

    if (hoursUntilStart < 24) {
      throw new BadRequestException(
        'Event cannot be deleted within 24 hours of its start time',
      );
    }

    await this.prisma.event.delete({ where: { id: eventId } });
    return { message: 'Event deleted successfully' };
  }

  // Register user for an event
  async registerForEvent(rawUserId: string, eventId: number, email?: string) {
    // 1. Resolve user using email FIRST
    const userId = await this.resolveUserId(rawUserId, email);

    // 2. Check if already registered (PREVENT CRASH)
    const existing = await this.prisma.eventRegistration.findFirst({
      where: {
        userId,
        eventId,
      },
    });

    if (existing) {
      return { message: "Already registered" };
    }

    // 3. Create registration
    return this.prisma.eventRegistration.create({
      data: {
        userId,
        eventId,
      },
    });
  }

  // Unregister user from an event
  async unregisterFromEvent(rawUserId: string, eventId: number, email?: string) {
    const userId = await this.resolveUserId(rawUserId, email);

    const existing = await this.prisma.eventRegistration.findUnique({
      where: { userId_eventId: { userId, eventId } },
    });
    if (!existing) throw new NotFoundException('Registration not found');

    return this.prisma.eventRegistration.delete({
      where: { userId_eventId: { userId, eventId } },
    });
  }

  // Get event gallery images
  async getEventGallery(eventId: number) {
    const event = await this.prisma.event.findUnique({
      where: { id: eventId },
      select: { id: true },
    });

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    const images = await this.prisma.eventGalleryImage.findMany({
      where: { eventId },
      orderBy: { displayOrder: 'asc' },
      select: {
        id: true,
        imageUrl: true,
        displayOrder: true,
        uploadedAt: true,
      },
    });

    return { images };
  }

  // Add event gallery image (max 5 per event)
  async addEventGalleryImage(
    eventId: number,
    rawUserId: string,
    imageUrl: string,
  ): Promise<{
    id: number;
    imageUrl: string;
    displayOrder: number;
    uploadedAt: Date;
  }> {
    const vendorId = await this.resolveVendorId(rawUserId);

    const event = await this.prisma.event.findUnique({
      where: { id: eventId },
      select: { id: true, vendorId: true },
    });

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    if (!event.vendorId || event.vendorId !== vendorId) {
      throw new ForbiddenException(
        'Only the event creator can add gallery images',
      );
    }

    // Check existing images count
    const existingCount = await this.prisma.eventGalleryImage.count({
      where: { eventId },
    });

    if (existingCount >= 5) {
      throw new BadRequestException(
        'Maximum 5 gallery images allowed per event',
      );
    }

    const image = await this.prisma.eventGalleryImage.create({
      data: {
        eventId,
        imageUrl,
        displayOrder: existingCount,
      },
      select: {
        id: true,
        imageUrl: true,
        displayOrder: true,
        uploadedAt: true,
      },
    });

    return {
      id: image.id,
      imageUrl: image.imageUrl,
      displayOrder: image.displayOrder,
      uploadedAt: image.uploadedAt,
    };
  }

  // Delete event gallery image
  async deleteEventGalleryImage(
    eventId: number,
    imageId: number,
    rawUserId: string,
  ) {
    const vendorId = await this.resolveVendorId(rawUserId);

    const event = await this.prisma.event.findUnique({
      where: { id: eventId },
      select: { id: true, vendorId: true },
    });

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    if (!event.vendorId || event.vendorId !== vendorId) {
      throw new ForbiddenException(
        'Only the event creator can delete gallery images',
      );
    }

    const image = await this.prisma.eventGalleryImage.findUnique({
      where: { id: imageId },
      select: { eventId: true },
    });

    if (!image) {
      throw new NotFoundException('Gallery image not found');
    }

    if (image.eventId !== eventId) {
      throw new BadRequestException('Image does not belong to this event');
    }

    await this.prisma.eventGalleryImage.delete({ where: { id: imageId } });

    return { message: 'Gallery image deleted successfully' };
  }
}
