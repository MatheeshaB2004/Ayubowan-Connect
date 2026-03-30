import { Test, TestingModule } from '@nestjs/testing';
import { VendorManagementController } from './vendor-management.controller';
import { VendorManagementService } from './vendor-management.service';

const mockService = {
  approveVendor: jest.fn(),
  rejectVendor: jest.fn(),
};

describe('VendorManagementController', () => {
  let controller: VendorManagementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VendorManagementController],
      providers: [
        {
          provide: VendorManagementService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<VendorManagementController>(
      VendorManagementController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
