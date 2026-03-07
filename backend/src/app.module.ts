import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { MarketplaceModule } from './modules/marketplace/marketplace.module';
import { CartModule } from './modules/cart/cart.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MarketplaceModule,
    CartModule,
  ],
})
export class AppModule {}