import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { MarketplaceModule } from './modules/marketplace/marketplace.module';
import { PaymentsModule } from './modules/payments/payments.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MarketplaceModule,
    PaymentsModule,
  ],
})
export class AppModule {}