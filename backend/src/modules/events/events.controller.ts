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
} from '@nestjs/common';

import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { EventQueryDto } from './dto/event-query.dto';

// ─── TEMPORARY: Guards commented out until JWT is wired in ───────────────────
// When your auth is ready, uncomment these two lines and the @UseGuards() lines:
// import { UseGuards } from '@nestjs/common';
// import { JwtAuthGuard } from '../authentication/guards/jwt-auth.guard';
// ─────────────────────────────────────────────────────────────────────────────

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  // ── Public routes ──────────────────────────────────────────────────────────

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
  getUserRegisteredEvents(@Request() req: any) {
    // TODO: replace hardcoded id with req.user.id once JWT guard is active
    const userId: number = req.user?.id ?? 1;
    return this.eventsService.getUserRegisteredEvents(userId);
  }

  // GET /events/:id  — keep BELOW named routes
  @Get(':id')
  getEventById(@Param('id', ParseIntPipe) id: number) {
    return this.eventsService.getEventById(id);
  }

  // ── Protected routes (vendor) ──────────────────────────────────────────────

  // POST /events
  // @UseGuards(JwtAuthGuard)
  @Post()
  createEvent(@Request() req: any, @Body() dto: CreateEventDto) {
    // TODO: replace hardcoded id with req.user.vendorId once JWT guard is active
    const vendorId: number = req.user?.vendorId ?? 1;
    return this.eventsService.createEvent(vendorId, dto);
  }

  // ── Protected routes (user) ────────────────────────────────────────────────

  // POST /events/:id/register
  // @UseGuards(JwtAuthGuard)
  @Post(':id/register')
  registerForEvent(
    @Request() req: any,
    @Param('id', ParseIntPipe) eventId: number,
  ) {
    const userId: number = req.user?.id ?? 1;
    return this.eventsService.registerForEvent(userId, eventId);
  }

  // DELETE /events/:id/register
  // @UseGuards(JwtAuthGuard)
  @Delete(':id/register')
  unregisterFromEvent(
    @Request() req: any,
    @Param('id', ParseIntPipe) eventId: number,
  ) {
    const userId: number = req.user?.id ?? 1;
    return this.eventsService.unregisterFromEvent(userId, eventId);
  }
}
