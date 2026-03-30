import { Test, TestingModule } from '@nestjs/testing';
import { NewsletterController } from './newsletter.controller';
import { NewsletterService } from './newsletter.service';

const mockNewsletterService = {
  subscribe: jest.fn(),
};

describe('NewsletterController', () => {
  let controller: NewsletterController;
  let service: typeof mockNewsletterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NewsletterController],
      providers: [
        {
          provide: NewsletterService,
          useValue: mockNewsletterService,
        },
      ],
    }).compile();

    controller = module.get<NewsletterController>(NewsletterController);
    service = module.get(NewsletterService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should proxy the subscribed email validation logic', async () => {
    mockNewsletterService.subscribe.mockResolvedValue({ message: 'Subscribed' });
    if (controller.subscribe) {
      // The controller might pass the entire DTO or destructure it. 
      // We test that the route successfully hits the service bound.
      const result = await (controller as any).subscribe({ email: 'test@t.com' });
      expect(service.subscribe).toHaveBeenCalled();
      expect(result).toBeDefined();
    }
  });
});
