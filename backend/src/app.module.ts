import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { MarketplaceModule } from './modules/marketplace/marketplace.module';
import { VendorManagementModule } from './modules/vendor-management/vendor-management.module';
import { CartModule } from './modules/cart/cart.module';
import { FilesController } from './files.controller';
import { CloudinaryModule } from './cloudinary/cloudinary.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    CloudinaryModule,
    MarketplaceModule,
    VendorManagementModule,
    CartModule,
  ],
  controllers: [AppController, FilesController],
  providers: [AppService],
})
export class AppModule {}
