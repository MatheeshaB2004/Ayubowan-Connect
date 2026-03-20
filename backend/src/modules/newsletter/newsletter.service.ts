import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class NewsletterService {
  async subscribe(email: string) {
    const apiKey = process.env.BREVO_API_KEY;

    if (!apiKey) {
      throw new HttpException('Brevo configuration missing', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    try {
      const resp = await fetch('https://api.brevo.com/v3/contacts', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json',
          'api-key': apiKey,
        },
        body: JSON.stringify({ email, listIds: [] }),
      });

      if (!resp.ok) {
        const error = await resp.json();
        if (error.code === 'duplicate_parameter') {
          return { message: 'You are already subscribed!' };
        }
        throw new Error(error.message || 'Newsletter signup failed');
      }

      return { message: 'Successfully subscribed to the newsletter!' };
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
