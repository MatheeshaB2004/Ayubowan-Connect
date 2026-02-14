import { Module } from '@nestjs/common';
import { VendorManagementController } from './vendor-management.controller';
import { VendorManagementService } from './vendor-management.service';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [VendorManagementController],
  providers: [VendorManagementService],
  exports: [VendorManagementService],
})
export class VendorManagementModule {}
