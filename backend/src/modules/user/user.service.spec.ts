import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from '../../prisma/prisma.service';

const mockPrismaService = {
  user: {
    findUnique: jest.fn(),
    create: jest.fn(),
  },
  localTourist: {
    upsert: jest.fn(),
  },
};

describe('UserService', () => {
  let service: UserService;
  let prisma: typeof mockPrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    prisma = module.get(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('registerTourist', () => {
    it('should create a new user and upsert the tourist profile if email does not exist', async () => {
      const dto = {
        fullName: 'Test User',
        email: 'test@example.com',
        profilePhotoUrl: 'http://test.com/photo.jpg',
        userType: 'DOMESTIC',
        nationality: 'Sri Lankan',
        preferredLanguage: 'English'
      };

      prisma.user.findUnique.mockResolvedValue(null);
      prisma.user.create.mockResolvedValue({ id: 1, email: dto.email, fullName: dto.fullName });
      prisma.localTourist.upsert.mockResolvedValue({ userId: 1, fullName: dto.fullName });

      const result = await service.registerTourist(dto as any);
      
      expect(prisma.user.create).toHaveBeenCalled();
      expect(prisma.localTourist.upsert).toHaveBeenCalled();
      expect(result.message).toBe('Tourist profile registered successfully');
      expect(result.data).toBeDefined();
    });

    it('should throw InternalServerErrorException on database failure', async () => {
      prisma.user.findUnique.mockRejectedValue(new Error('DB Error'));
      await expect(service.registerTourist({ email: 'err@err.com' } as any)).rejects.toThrow('Failed to register tourist profile');
    });
  });
});
