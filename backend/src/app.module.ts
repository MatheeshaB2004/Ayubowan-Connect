import { PaymentsModule } from './modules/payments/payments.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [PaymentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
