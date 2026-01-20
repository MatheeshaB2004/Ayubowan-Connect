import { Injectable} from '@nestjs/common';

@Injectable()
export class EventsService {
    private events: any[] = [];

    getAllEvents() {
        return this.events;
    }

    createEvent(eventData: any) {
        this.events.push(eventData);
        return { message: 'Event created successfully', event: eventData};
    }
}