import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class NewsletterService {
  async subscribe(email: string) {
    const apiKey = process.env.RESEND_API_KEY;
    const audienceId = process.env.RESEND_AUDIENCE_ID;

    if (!apiKey || !audienceId) {
      throw new HttpException('Resend configuration missing', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    try {
      // 1. Add the user to your Audience List
      const audienceResp = await fetch(`https://api.resend.com/audiences/${audienceId}/contacts`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          unsubscribed: false,
        }),
      });

      const audienceData = await audienceResp.json();

      if (!audienceResp.ok) {
        if (audienceData.message?.includes('already exists')) {
          return { message: 'You are already subscribed!' };
        }
        throw new Error(audienceData.message || 'Newsletter signup failed');
      }

      // 2. Send the "Thank You / Welcome" Email immediately
      // Note: If you don't have a custom domain on Resend yet, this will ONLY work if `email` is the same address you used to register for Resend.
      const emailResp = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Ayubowan Connect <onboarding@resend.dev>', // Change to your verified domain email later (e.g., hello@ayubowanconnect.com)
          to: [email],
          subject: 'Welcome to Ayubowan Connect! 🌴',
          html: `
            <div style="font-family: sans-serif; padding: 20px; color: #333;">
              <h2>Ayubowan! 🙏</h2>
              <p>Thank you so much for joining the Ayubowan Connect community. We are thrilled to have you with us!</p>
              <p>As a subscriber, you’ll be the first to know about:</p>
              <ul>
                <li>✨ Exclusive cultural experiences and upcoming events.</li>
                <li>🏺 Behind-the-scenes stories from our authentic local vendors.</li>
                <li>🌴 Travel inspiration and guides to hidden gems across Sri Lanka.</li>
              </ul>
              <p>We can’t wait to share the magic of Sri Lanka with you.</p>
              <br/>
              <p>With warm regards,</p>
              <p><strong>The Ayubowan Connect Team</strong></p>
            </div>
          `,
        }),
      });

      if (!emailResp.ok) {
        console.error("Failed to send welcome email:", await emailResp.json());
        // We log the error but still return success to the user since they were added to the list successfully
      }

      return { message: 'Successfully subscribed to the newsletter!' };
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}

