import { Test, TestingModule } from '@nestjs/testing';
import { EventsService } from './events.service';
import { PrismaService } from '../../prisma/prisma.service';

const mockPrismaService = {
  event: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
  },
};

describe('EventsService', () => {
  let service: EventsService;
  let prisma: typeof mockPrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventsService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<EventsService>(EventsService);
    prisma = module.get(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should execute raw data proxy when getAllEvents is invoked', async () => {
    prisma.event.findMany.mockResolvedValue([]);
    const results = await service.getAllEvents({} as any);
    expect(results).toEqual([]);
    expect(prisma.event.findMany).toHaveBeenCalled();
  });
});
