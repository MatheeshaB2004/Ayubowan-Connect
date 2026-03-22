import { Module } from '@nestjs/common';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { CloudinaryModule } from '../../cloudinary/cloudinary.module';

@Module({
  imports: [CloudinaryModule],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}
