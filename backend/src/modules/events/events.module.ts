import { Modules } from '@nestjs/common';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';

@Modules({
    controllers: [EventsController],
    providers: [EventsService],
})
export class EventsModule {}