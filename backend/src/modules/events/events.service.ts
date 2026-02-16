import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';

interface Event {
  [key: string]: unknown;
}

@Injectable()
export class EventsService {
  private events: CreateEventDto[] = [];

  getAllEvents(): CreateEventDto[] {
    return this.events;
  }

  createEvent(eventData: CreateEventDto) {
    if (typeof eventData !== 'object' || eventData === null) {
      throw new Error('Invalid event data');
    }
    this.events.push(eventData);
    return { message: 'Event created' };
  }
}
