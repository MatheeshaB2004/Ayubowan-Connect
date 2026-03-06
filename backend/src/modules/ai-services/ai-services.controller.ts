import {
  Controller,
  Post,
  Body,
  InternalServerErrorException,
} from '@nestjs/common';
import { AiServicesService } from './ai-services.service';

@Controller('ai-services')
export class AiServicesController {
  constructor(private readonly aiService: AiServicesService) {}

  @Post('generate-itinerary')
  async generateItinerary(
    @Body()
    body: {
      destination: string;
      duration: number;
      budget: string;
      interests: string[];
      travelStyle: string;
    },
  ) {
    try {
      if (!body.destination || !body.duration) {
        throw new Error('Destination and duration are required');
      }
      return await this.aiService.generateTripItinerary(body);
    } catch (error) {
      console.error('Error generating itinerary:', error);
      throw new InternalServerErrorException(error.message);
    }
  }
}
