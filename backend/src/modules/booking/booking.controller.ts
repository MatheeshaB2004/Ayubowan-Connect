import { Controller, Get, Post, Body, Headers, BadRequestException, Patch, Param, ParseIntPipe } from '@nestjs/common';
import { BookingService } from './booking.service';

@Controller('booking')
export class BookingController {
  constructor(private bookingService: BookingService) {}

  @Post()
  async createBooking(
    @Headers('x-user-email') email: string,
    @Body() body: {
      listingId: number | string;
      date: string;
      participants: number | string;
      slotId?: number | string;
      notes?: string;
    }
  ) {
    if (!email) {
      throw new BadRequestException('Email is required');
    }
    return this.bookingService.createBooking(email, body);
  }

  @Get()
  async getUserBookings(
    @Headers('x-user-email') email: string
  ) {
    if (!email) {
      throw new BadRequestException('Email is required');
    }
    return this.bookingService.getUserBookings(email);
  }

  @Get('availability/:vendorId')
  async getVendorAvailability(
    @Param('vendorId', ParseIntPipe) vendorId: number
  ) {
    return this.bookingService.getVendorAvailability(vendorId);
  }

  @Get('availability/listing/:listingId')
  async getListingAvailability(
    @Param('listingId', ParseIntPipe) listingId: number
  ) {
    return this.bookingService.getListingAvailability(listingId);
  }

  @Get('vendor/:vendorId')
  async getVendorBookings(
    @Param('vendorId', ParseIntPipe) vendorId: number
  ) {
    return this.bookingService.getVendorBookings(vendorId);
  }

  @Get(':id')
  async getBookingById(
    @Param('id', ParseIntPipe) id: number,
    @Headers('x-user-email') email: string
  ) {
    if (!email) {
      throw new BadRequestException('Email is required');
    }

    return this.bookingService.getBookingById(id, email);
  }

  @Patch(':id/status')
  async updateBookingStatus(
    @Param('id') id: string,
    @Body() body: { status: string },
    @Headers('x-user-email') email: string
  ) {
    if (!email) {
      throw new BadRequestException('Email is required');
    }
    return this.bookingService.updateBookingStatus(Number(id), body.status, email);
  }
}