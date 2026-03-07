import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { MarketplaceModule } from './modules/marketplace/marketplace.module';
import { CartModule } from './modules/cart/cart.module';
import { ChatbotModule } from './modules/chatbot/chatbot.module';
import { FilesController } from './files.controller';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { EventsModule } from './modules/events/events.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MarketplaceModule,
    CartModule,
    DashboardModule,
    EventsModule,
    ChatbotModule,
    EventsModule
  ],
})
export class AppModule {}
