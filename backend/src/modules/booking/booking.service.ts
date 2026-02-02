import { Injectable } from '@nestjs/common';

@Injectable()
export class BookingService {
  createBooking(userId: number, listingId: number, bookingDate: string) {
    return {
      bookingId: Math.floor(Math.random() * 10000),
      userId,
      listingId,
      bookingDate,
      status: 'PENDING',
      createdAt: new Date(),
    };
  }
}
