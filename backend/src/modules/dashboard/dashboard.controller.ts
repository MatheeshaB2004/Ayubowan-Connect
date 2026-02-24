import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
} from '@nestjs/common';
import { Query } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('vendor/dashboard')
export class DashboardController {
  constructor(private readonly service: DashboardService) { }

  // CREATE GOAL
  @Post('goal')
  createGoal(@Body() body: { userId: number; target: number }) {
    return this.service.createGoal(body.userId, body.target);
  }

  // GET DASHBOARD
  @Get()
  getDashboard(@Query('userId') userId: string) {
    return this.service.getDashboard(Number(userId));
  }

  // INCREASE GOAL
  @Patch('goal')
  increaseGoal(@Body() body: { userId: number; target: number }) {
    return this.service.increaseGoal(body.userId, body.target);
  }

  // DELETE GOAL
  @Delete('goal')
  deleteGoal(@Body() body: { userId: number }) {
    return this.service.deleteGoal(body.userId);
  }

  @Get('summary')
  getSummary(@Query('userId') userId: string) {
    return this.service.getVendorSummary(Number(userId));
  }

  @Get("booking-trend")
  getBookingTrend(
    @Query("userId") userId: string,
    @Query("period") period: string
  ) {
    return this.service.getBookingTrend(
      Number(userId),
      period
    );
  }

}