import { Controller, Post, Body } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';
import { ChatbotResponseDto } from './dto/chatbot.dto';

@Controller('chatbot')
export class ChatbotController {
    constructor(private readonly chatbotService: ChatbotService) { }

    @Post('webhook')
    async handleWebhook(@Body() request: any): Promise<ChatbotResponseDto> {
        return await this.chatbotService.processWebhook(request);
    }
}
