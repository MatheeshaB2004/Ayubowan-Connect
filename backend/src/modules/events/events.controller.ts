import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Query,
  ParseIntPipe,
  Headers,
  UnauthorizedException,
  BadRequestException,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { EventQueryDto } from './dto/event-query.dto';
import { CloudinaryService } from '../../cloudinary/cloudinary.service';

@Controller('events')
export class EventsController {
  constructor(
    private readonly eventsService: EventsService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  // Public routes

  // GET /events?search=&category=&location=
  @Get()
  getAllEvents(@Query() query: EventQueryDto) {
    return this.eventsService.getAllEvents(query);
  }

  // GET /events/vendor/mine  — must be ABOVE :id to avoid route conflict
  // @UseGuards(JwtAuthGuard)
  @Get('vendor/mine')
  getVendorEvents(@Headers('x-user-id') rawUserId: string) {
    if (!rawUserId) {
      throw new UnauthorizedException('Missing x-user-id header');
    }
    return this.eventsService.getVendorEvents(rawUserId);
  }

  // GET /events/user/registered  — must be ABOVE :id to avoid route conflict
  // @UseGuards(JwtAuthGuard)
  @Get('user/registered')
  getUserRegisteredEvents(
    @Headers('x-user-id') rawUserId: string,
    @Headers('x-user-email') emailFromHeader?: string
  ) {
    if (!rawUserId) {
      throw new UnauthorizedException('Missing x-user-id header');
    }
    return this.eventsService.getUserRegisteredEvents(rawUserId, emailFromHeader);
  }

  // POST /events/upload-image  — must be ABOVE :id to avoid route conflict
  @Post('upload-image')
  @UseInterceptors(FileInterceptor('file'))
  async uploadEventImage(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('Image file is required');
    }

    const allowedMimes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedMimes.includes(file.mimetype)) {
      throw new BadRequestException(
        'Invalid file type. Only JPG, PNG, WebP, and GIF are allowed.',
      );
    }

    const upload = await this.cloudinaryService.uploadFile(
      file,
      'ayubowan-connect/events',
    );

    return { url: upload.secure_url };
  }

  // Gallery routes — must be ABOVE :id routes

  // GET /events/:id/gallery
  @Get(':id/gallery')
  getEventGallery(@Param('id', ParseIntPipe) eventId: number) {
    return this.eventsService.getEventGallery(eventId);
  }

  // POST /events/:id/gallery
  @Post(':id/gallery')
  @UseInterceptors(FileInterceptor('file'))
  async uploadEventGalleryImage(
    @Param('id', ParseIntPipe) eventId: number,
    @Headers('x-user-id') rawUserId: string,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<any> {
    if (!rawUserId) {
      throw new UnauthorizedException('Missing x-user-id header');
    }
    if (!file) {
      throw new BadRequestException('Image file is required');
    }

    const allowedMimes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedMimes.includes(file.mimetype)) {
      throw new BadRequestException(
        'Invalid file type. Only JPG, PNG, WebP, and GIF are allowed.',
      );
    }

    const upload = await this.cloudinaryService.uploadFile(
      file,
      'ayubowan-connect/events/gallery',
    );

    return this.eventsService.addEventGalleryImage(
      eventId,
      rawUserId,
      upload.secure_url,
    );
  }

  // DELETE /events/:id/gallery/:imageId
  @Delete(':id/gallery/:imageId')
  deleteEventGalleryImage(
    @Param('id', ParseIntPipe) eventId: number,
    @Param('imageId', ParseIntPipe) imageId: number,
    @Headers('x-user-id') rawUserId: string,
  ) {
    if (!rawUserId) {
      throw new UnauthorizedException('Missing x-user-id header');
    }
    return this.eventsService.deleteEventGalleryImage(
      eventId,
      imageId,
      rawUserId,
    );
  }

  // GET /events/:id  — keep BELOW named routes
  @Get(':id')
  getEventById(@Param('id', ParseIntPipe) id: number) {
    return this.eventsService.getEventById(id);
  }

  // Protected routes (vendor)

  // POST /events
  // @UseGuards(JwtAuthGuard)
  @Post()
  createEvent(
    @Headers('x-user-id') rawUserId: string,
    @Body() dto: CreateEventDto,
  ) {
    if (!rawUserId) {
      throw new UnauthorizedException('Missing x-user-id header');
    }
    return this.eventsService.createEvent(rawUserId, dto);
  }

  // DELETE /events/:id
  // @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteEvent(
    @Headers('x-user-id') rawUserId: string,
    @Param('id', ParseIntPipe) eventId: number,
  ) {
    if (!rawUserId) {
      throw new UnauthorizedException('Missing x-user-id header');
    }
    return this.eventsService.deleteEvent(rawUserId, eventId);
  }

  // Protected routes (user)

  // POST /events/:id/register
  // @UseGuards(JwtAuthGuard)
  @Post(':id/register')
  registerForEvent(
    @Param('id', ParseIntPipe) eventId: number,
    @Headers('x-user-id') rawUserId: string,
    @Headers('x-user-email') emailFromHeader?: string,
  ) {
    if (!rawUserId) {
      throw new UnauthorizedException('Missing x-user-id header');
    }
    return this.eventsService.registerForEvent(rawUserId, eventId, emailFromHeader);
  }

  // DELETE /events/:id/register
  // @UseGuards(JwtAuthGuard)
  @Delete(':id/register')
  unregisterFromEvent(
    @Param('id', ParseIntPipe) eventId: number,
    @Headers('x-user-id') rawUserId: string,
    @Headers('x-user-email') emailFromHeader?: string,
  ) {
    if (!rawUserId) {
      throw new UnauthorizedException('Missing x-user-id header');
    }
    return this.eventsService.unregisterFromEvent(rawUserId, eventId, emailFromHeader);
  }
}
