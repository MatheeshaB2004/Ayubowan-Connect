import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

@Injectable()
export class AiServicesService {
  private openai: OpenAI;
  private readonly logger = new Logger(AiServicesService.name);

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('OPENAI_API_KEY');
    if (!apiKey) {
      this.logger.warn(
        'OPENAI_API_KEY is not set. AI services will not work correctly.',
      );
    }
    this.openai = new OpenAI({
      apiKey: apiKey || 'dummy-key', // Prevent crash on startup if key is missing
    });
  }

  async generateTripItinerary(params: {
    destination: string;
    duration: number;
    budget: string;
    interests: string[];
    travelStyle: string;
  }) {
    const { destination, duration, budget, interests, travelStyle } = params;

    const prompt = `
      Create a detailed ${duration}-day travel itinerary for a trip to ${destination}.
      
      Travel Preferences:
      - Budget: ${budget}
      - Interests: ${interests.join(', ')}
      - Travel Style: ${travelStyle}
      
      Please provide a day-by-day plan including morning, afternoon, and evening activities.
      Suggest specific places to visit, local food to try, and estimated costs.
      Format the response as JSON with the following structure:
      {
        "tripTitle": "string",
        "summary": "string",
        "dailyPlan": [
          {
            "day": 1,
            "title": "string",
            "activities": ["string", "string"],
            "meals": ["string", "string"]
          }
        ],
        "estimatedTotalCost": "string"
      }
    `;

    try {
      const completion = await this.openai.chat.completions.create({
        messages: [
          { role: 'system', content: 'You are an expert travel planner.' },
          { role: 'user', content: prompt },
        ],
        model: 'gpt-3.5-turbo',
        response_format: { type: 'json_object' },
      });

      const content = completion.choices[0].message.content;

      if (!content) {
        throw new Error('No content received from AI service');
      }

      return JSON.parse(content);
    } catch (error) {
      this.logger.error('OpenAI API Error:', error);
      throw new Error('Failed to generate itinerary. Please try again later.');
    }
  }
}
