import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Query,
  Request,
  ParseIntPipe,
  Headers,
  UnauthorizedException,
} from '@nestjs/common';

import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { EventQueryDto } from './dto/event-query.dto';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  // Public routes

  // GET /events?search=&category=&location=
  @Get()
  getAllEvents(@Query() query: EventQueryDto) {
    return this.eventsService.getAllEvents(query);
  }

  // GET /events/vendor/mine  — must be ABOVE :id to avoid route conflict
  // @UseGuards(JwtAuthGuard)
  @Get('vendor/mine')
  getVendorEvents(@Request() req: any) {
    // TODO: replace hardcoded id with req.user.vendorId once JWT guard is active
    const vendorId: number = req.user?.vendorId ?? 1;
    return this.eventsService.getVendorEvents(vendorId);
  }

  // GET /events/user/registered  — must be ABOVE :id to avoid route conflict
  // @UseGuards(JwtAuthGuard)
  @Get('user/registered')
  getUserRegisteredEvents(@Headers('x-user-id') rawUserId: string) {
    if (!rawUserId) {
      throw new UnauthorizedException('Missing x-user-id header');
    }
    return this.eventsService.getUserRegisteredEvents(rawUserId);
  }

  // GET /events/:id  — keep BELOW named routes
  @Get(':id')
  getEventById(@Param('id', ParseIntPipe) id: number) {
    return this.eventsService.getEventById(id);
  }

  // Protected routes (vendor)

  // POST /events
  // @UseGuards(JwtAuthGuard)
  @Post()
  createEvent(@Request() req: any, @Body() dto: CreateEventDto) {
    const vendorId: number = req.user?.vendorId ?? 1;
    return this.eventsService.createEvent(vendorId, dto);
  }

  // Protected routes (user)

  // POST /events/:id/register
  // @UseGuards(JwtAuthGuard)
  @Post(':id/register')
  registerForEvent(
    @Headers('x-user-id') rawUserId: string,
    @Param('id', ParseIntPipe) eventId: number,
  ) {
    if (!rawUserId) {
      throw new UnauthorizedException('Missing x-user-id header');
    }
    return this.eventsService.registerForEvent(rawUserId, eventId);
  }

  // DELETE /events/:id/register
  // @UseGuards(JwtAuthGuard)
  @Delete(':id/register')
  unregisterFromEvent(
    @Headers('x-user-id') rawUserId: string,
    @Param('id', ParseIntPipe) eventId: number,
  ) {
    if (!rawUserId) {
      throw new UnauthorizedException('Missing x-user-id header');
    }
    return this.eventsService.unregisterFromEvent(rawUserId, eventId);
  }
}
