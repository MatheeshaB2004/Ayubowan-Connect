import { Module, Global } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CloudinaryService } from './cloudinary.service';

@Global()
@Module({
  imports: [ConfigModule], // REQUIRED
  providers: [CloudinaryService],
  exports: [CloudinaryService],
})
export class CloudinaryModule {}