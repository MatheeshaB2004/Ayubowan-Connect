import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { AiServicesModule } from './modules/ai-services/ai-services.module'; // Import AI Service module

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AuthenticationModule,
    AiServicesModule, // Add this module
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
