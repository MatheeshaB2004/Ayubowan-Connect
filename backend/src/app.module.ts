import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { MarketplaceModule } from './modules/marketplace/marketplace.module';
// import { PaymentsModule } from './modules/payments/payments.module';

@Module({
  imports: [
    MarketplaceModule,
    // PaymentsModule, // ⛔ TEMP DISABLED
  ],
})
export class AppModule {}