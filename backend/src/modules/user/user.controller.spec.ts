import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from '../../prisma/prisma.service';

const mockUserService = {
  registerTourist: jest.fn(),
};

describe('UserController', () => {
  let controller: UserController;
  let service: typeof mockUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },
        {
          provide: PrismaService,
          useValue: {},
        }
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Validation & Routing', () => {
    it('should execute register endpoint and proxy the generic response', async () => {
      mockUserService.registerTourist.mockResolvedValue({ message: 'Success', data: {} });
      if (controller.registerTourist) {
        const result = await controller.registerTourist({ email: 'test@example.com' } as any);
        expect(service.registerTourist).toHaveBeenCalled();
        expect(result.message).toBe('Success');
      }
    });
  });
});
