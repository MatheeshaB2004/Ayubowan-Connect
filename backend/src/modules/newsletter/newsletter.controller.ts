import { Controller, Post, Body } from '@nestjs/common';
import { NewsletterService } from './newsletter.service';

@Controller('newsletter')
export class NewsletterController {
  constructor(private readonly newsletterService: NewsletterService) {}

  @Post('subscribe')
  async subscribe(@Body('email') email: string) {
    return this.newsletterService.subscribe(email);
  }
}
