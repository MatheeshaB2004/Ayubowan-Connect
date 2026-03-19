import { Injectable } from '@nestjs/common';

@Injectable()
export class AiServicesService {
  generateItinerary(preferences: any) {
    const { destination, duration, budget, travelStyle } = preferences;
    
    // Generate a simple mock itinerary based on user preferences
    const dailyPlan: any[] = [];
    for (let i = 1; i <= (duration || 3); i++) {
        dailyPlan.push({
            day: i,
            title: `Exploring ${destination || 'Sri Lanka'} - Day ${i}`,
            activities: [
                `Morning visit to local attractions in ${destination || 'the city'}`,
                `Afternoon adventure matching a ${travelStyle || 'Relaxed'} pace`,
                `Evening cultural experience`
            ],
            meals: [
                'Breakfast at hotel',
                'Lunch at a recommended local restaurant',
                'Dinner exploring local cuisine'
            ]
        });
    }

    return {
      tripTitle: `${duration || 3}-Day ${travelStyle || 'Relaxed'} Gateway to ${destination || 'Sri Lanka'}`,
      summary: `A personalized ${budget || 'Medium'}-budget itinerary focused on your preferred interests.`,
      estimatedTotalCost: budget === 'Luxury' ? '$1200 - $2500' : budget === 'Budget' ? '$150 - $400' : '$400 - $1000',
      dailyPlan
    };
  }
}
