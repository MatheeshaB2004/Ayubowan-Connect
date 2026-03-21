import { Module } from '@nestjs/common';
import { AiServicesController } from './ai-services.controller';
import { AiServicesService } from './ai-services.service';

@Module({
  controllers: [AiServicesController],
  providers: [AiServicesService],
})
export class AiServicesModule {}
