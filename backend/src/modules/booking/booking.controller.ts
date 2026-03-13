import { Controller, Post, Body, Headers, Get, Patch, Param } from '@nestjs/common';
import { BookingService } from './booking.service';

@Controller('bookings')
export class BookingController {
  constructor(private bookingService: BookingService) {}

  @Post()
  async createBooking(
    @Headers('x-user-id') userId: string,
    @Body() body: { listingId: number | string; date: string; participants: number | string; notes?: string }
  ) {
    return this.bookingService.createBooking(userId, body);
  }

  @Get()
  async getUserBookings(
    @Headers('x-user-id') userId: string
  ) {
    return this.bookingService.getUserBookings(userId);
  }

  @Patch(':id/status')
  async updateBookingStatus(
    @Param('id') id: string,
    @Body() body: { status: string },
    @Headers('x-user-id') userId: string
  ) {
    return this.bookingService.updateBookingStatus(Number(id), body.status, userId);
  }
}