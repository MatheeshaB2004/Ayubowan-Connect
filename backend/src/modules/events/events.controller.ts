import { Controller, Get, Post, Body } from '@nestjs/common';
import { EventsService } from './events.service';

@Controller('events')
export class EventsController {
    constructor(private readonly eventsService: EventsService) {}

    @Get()
    getEvents() {
        return this.eventsService.getAllEvents();
    }

    @Post()
    createEvent(@Body() eventData: any) {
        return this.eventsService.createEvent(eventData);
    }
}