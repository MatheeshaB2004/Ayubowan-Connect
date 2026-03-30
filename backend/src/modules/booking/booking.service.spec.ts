import { Test, TestingModule } from '@nestjs/testing';
import { BookingService } from './booking.service';
import { PrismaService } from '../../prisma/prisma.service';

const mockPrismaService = {
  user: {
    findUnique: jest.fn(),
    findFirst: jest.fn(),
  },
  vendor: {
    findUnique: jest.fn(),
  },
  listing: {
    findUnique: jest.fn(),
  },
  vendorAvailability: {
    findMany: jest.fn(),
  },
  booking: {
    create: jest.fn(),
    update: jest.fn(),
    findUnique: jest.fn(),
    findMany: jest.fn(),
    findFirst: jest.fn(),
  },
  availabilitySlot: {
    findUnique: jest.fn(),
    update: jest.fn(),
    findMany: jest.fn(),
  },
};

describe('BookingService', () => {
  let service: BookingService;
  let prisma: typeof mockPrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookingService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<BookingService>(BookingService);
    prisma = module.get(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getListingAvailability', () => {
    it('should throw NotFoundException if listing does not exist', async () => {
      prisma.listing.findUnique.mockResolvedValue(null);
      await expect(service.getListingAvailability(999)).rejects.toThrow(
        'Listing not found',
      );
    });

    it('should aggregate empty array if no dates exist', async () => {
      prisma.listing.findUnique.mockResolvedValue({ vendorId: 1 });
      prisma.vendorAvailability.findMany.mockResolvedValue([]);
      const result = await service.getListingAvailability(1);
      expect(result).toEqual([]);
    });
  });

  describe('updateBookingStatus', () => {
    it('should throw if booking not found', async () => {
      prisma.user.findUnique.mockResolvedValue({
        id: 1,
        email: 'test@t.com',
        localTourist: { userId: 1 },
      });
      prisma.booking.findUnique.mockResolvedValue(null);

      await expect(
        service.updateBookingStatus(1, 'CONFIRMED', 'test@t.com'),
      ).rejects.toThrow('Booking not found');
    });
  });
});
