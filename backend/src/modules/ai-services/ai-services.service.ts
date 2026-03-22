import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class AiServicesService {
  async generateItinerary(preferences: any) {
    const { destination, duration, budget, travelStyle, interests } = preferences;

    const prompt = `You are a professional travel planner specializing in Sri Lanka.
Generate a cohesive travel itinerary for a ${duration}-day trip to ${destination}.
Budget level: ${budget}
Travel Style: ${travelStyle}
Interests: ${(interests || []).join(', ')}

Return ONLY a valid JSON object matching this schema exactly, with NO markdown formatting, NO \`\`\`json, NO extra text:
{
    "tripTitle": "A catchy title for the trip",
    "summary": "A 2-sentence summary of the trip",
    "estimatedTotalCost": "A realistic estimated total cost range in Sri Lankan Rupees LKR (e.g. LKR 50,000 - LKR 120,000)",
    "dailyPlan": [
        {
            "day": 1,
            "title": "Title for this day",
            "activities": ["Activity 1", "Activity 2", "Activity 3"],
            "meals": ["Breakfast: ...", "Lunch: ...", "Dinner: ..."]
        }
    ]
}

Ensure the number of days in dailyPlan exactly matches ${duration}.`;

    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [
            { role: 'system', content: 'You are an expert AI travel agent.' },
            { role: 'user', content: prompt }
          ],
          temperature: 0.7,
        })
      });

      if (!response.ok) {
        const errortext = await response.text();
        console.error('Groq API Error details:', errortext);
        throw new Error(`Groq API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      let aiContent = data.choices[0].message.content.trim();

      if (aiContent.startsWith('\`\`\`json')) {
        aiContent = aiContent.substring(7);
      }
      if (aiContent.startsWith('\`\`\`')) {
        aiContent = aiContent.substring(3);
      }
      if (aiContent.endsWith('\`\`\`')) {
        aiContent = aiContent.substring(0, aiContent.length - 3);
      }
      aiContent = aiContent.trim();

      const parsedItinerary = JSON.parse(aiContent);
      return parsedItinerary;
    } catch (error) {
      console.error('Error generating itinerary:', error);
      throw new HttpException(
        `Failed to generate itinerary. Detail: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
