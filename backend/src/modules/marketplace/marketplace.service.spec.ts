import { Test, TestingModule } from '@nestjs/testing';
import { MarketplaceService } from './marketplace.service';
import { PrismaService } from '../../prisma/prisma.service';

const mockPrismaService = {
  listing: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    count: jest.fn(),
  },
  $transaction: jest.fn(),
};

describe('MarketplaceService', () => {
  let service: MarketplaceService;
  let prisma: typeof mockPrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MarketplaceService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<MarketplaceService>(MarketplaceService);
    prisma = module.get(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should attempt to retrieve generic arrays from listing table safely via transaction', async () => {
    // The service uses Prisma $transaction to get count & listings concurrently
    prisma.$transaction.mockResolvedValue([
      1,
      [{ id: 1, title: 'Sample', media: [], reviews: [] }],
    ]);

    const result = await (service as any).findAll({});
    expect(result).toBeDefined();
    expect(prisma.$transaction).toHaveBeenCalled();
  });
});
