import { Controller, Post, Body } from '@nestjs/common';
import { AiServicesService } from './ai-services.service';

@Controller('ai-services')
export class AiServicesController {
  constructor(private readonly aiServicesService: AiServicesService) {}

  @Post('generate-itinerary')
  generateItinerary(@Body() body: any) {
    return this.aiServicesService.generateItinerary(body);
  }
}
