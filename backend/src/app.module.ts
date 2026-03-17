import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { MarketplaceModule } from './modules/marketplace/marketplace.module';
import { CartModule } from './modules/cart/cart.module';
import { ChatbotModule } from './modules/chatbot/chatbot.module';
import { FilesController } from './files.controller';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { EventsModule } from './modules/events/events.module';
import { BookingModule } from './modules/booking/booking.module';
import { OrdersModule } from './modules/orders/orders.module';
import { VendorManagementModule } from './modules/vendor-management/vendor-management.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AuthenticationModule,
    CloudinaryModule,
    MarketplaceModule,
    CartModule,
    DashboardModule,
    EventsModule,
    ChatbotModule,
    BookingModule,
    OrdersModule,
    VendorManagementModule,
  ],
})
export class AppModule {}
