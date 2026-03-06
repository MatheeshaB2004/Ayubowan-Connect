import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateEventDto } from './dto/create-event.dto';
import { EventQueryDto } from './dto/event-query.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}

  // ── Get all published events with optional filters ─────────────────────────
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
      isLive:
        event.startDate <= now && (!event.endDate || event.endDate >= now),
    }));
  }

  // ── Get a single event by ID ───────────────────────────────────────────────
  async getEventById(id: number) {
    const event = await this.prisma.event.findUnique({
      where: { id },
      include: {
        vendor: { select: { id: true, businessName: true } },
        registrations: { select: { id: true } },
      },
    });

    if (!event) throw new NotFoundException('Event not found');

    const now = new Date();
    return {
      ...event,
      participantCount: event.registrations.length,
      isLive:
        event.startDate <= now && (!event.endDate || event.endDate >= now),
    };
  }

  // ── Get events created by a specific vendor ────────────────────────────────
  async getVendorEvents(vendorId: number) {
    const now = new Date();

    const events = await this.prisma.event.findMany({
      where: { vendorId },
      include: { registrations: { select: { id: true } } },
      orderBy: { startDate: 'asc' },
    });

    return events.map((event) => {
      const isLive =
        event.startDate <= now && (!event.endDate || event.endDate >= now);
      const isPast = event.endDate
        ? event.endDate < now
        : event.startDate < now;

      return {
        ...event,
        participantCount: event.registrations.length,
        isLive,
        computedStatus: isLive ? 'live' : isPast ? 'past' : 'upcoming',
      };
    });
  }

  // ── Get events a user has registered for ──────────────────────────────────
  async getUserRegisteredEvents(userId: number) {
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
      participantCount: r.event.registrations.length,
    }));
  }

  // ── Create event (vendor only) ─────────────────────────────────────────────
  async createEvent(vendorId: number, dto: CreateEventDto) {
    const { startDate, endDate, ...rest } = dto;

    return this.prisma.event.create({
      data: {
        ...rest,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        vendorId,
      },
    });
  }

  // ── Register user for an event ─────────────────────────────────────────────
  async registerForEvent(userId: number, eventId: number) {
    const event = await this.prisma.event.findUnique({
      where: { id: eventId },
    });
    if (!event) throw new NotFoundException('Event not found');

    const existing = await this.prisma.eventRegistration.findUnique({
      where: { userId_eventId: { userId, eventId } },
    });
    if (existing) return { message: 'Already registered' };

    return this.prisma.eventRegistration.create({
      data: { userId, eventId },
    });
  }

  // ── Unregister user from an event ─────────────────────────────────────────
  async unregisterFromEvent(userId: number, eventId: number) {
    const existing = await this.prisma.eventRegistration.findUnique({
      where: { userId_eventId: { userId, eventId } },
    });
    if (!existing) throw new NotFoundException('Registration not found');

    return this.prisma.eventRegistration.delete({
      where: { userId_eventId: { userId, eventId } },
    });
  }
}
