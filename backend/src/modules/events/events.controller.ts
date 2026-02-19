import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  getAll() {
    return this.eventsService.getAllEvents();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.eventsService.getEventById(Number(id));
  }

  @Post()
  create(@Body() dto: CreateEventDto) {
    return this.eventsService.createEvent(dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.eventsService.deleteEvent(Number(id));
  }
}
