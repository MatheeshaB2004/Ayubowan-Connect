import { Controller, Get, Post, Body } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { EventsService } from './events.service';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  getEvents(): any {
    return this.eventsService.getAllEvents();
  }

  @Post()
  createEvent(@Body() eventData: CreateEventDto) {
    return this.eventsService.createEvent(eventData);
  }
}
