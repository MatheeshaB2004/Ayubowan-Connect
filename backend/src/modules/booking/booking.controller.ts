import { Controller, Post, Body } from '@nestjs/common';
import { BookingService } from './booking.service';

@Controller('bookings')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  createBooking(
    @Body('userId') userId: number,
    @Body('listingId') listingId: number,
    @Body('bookingDate') bookingDate: string,
  ) {
    return this.bookingService.createBooking(userId, listingId, bookingDate);
  }
}
