import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateEventDto } from './dto/create-event.dto';

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}

  async getAllEvents() {
    return this.prisma.event.findMany({
      orderBy: { startDate: 'asc' },
    });
  }

  async getEventById(id: number) {
    return this.prisma.event.findUnique({
      where: { id },
    });
  }

  async createEvent(data: CreateEventDto) {
    return this.prisma.event.create({
      data: {
        ...data,
        startDate: new Date(data.startDate),
        endDate: data.endDate ? new Date(data.endDate) : null,
      },
    });
  }

  async deleteEvent(id: number) {
    return this.prisma.event.delete({
      where: { id },
    });
  }
}
