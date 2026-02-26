import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
} from '@nestjs/common';
import { Query } from '@nestjs/common';
import { Param } from "@nestjs/common";
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
  getSummary(
    @Query('userId') userId: string,
    @Query('period') period: string,
  ) {
    return this.service.getVendorSummary(Number(userId), period || "thisMonth");
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

  @Get("top-listings")
  getTopListings(
    @Query("userId") userId: string,
    @Query("period") period: string
  ) {
    return this.service.getTopListings(Number(userId), period || "thisMonth");
  }

  @Get("ratings")
  getRatings(
    @Query("userId") userId: string,
    @Query("period") period: string
  ) {
    return this.service.getRatingAnalytics(Number(userId), period || "thisMonth");
  }

  @Get("insights")
  getInsights(
    @Query("userId") userId: string,
    @Query("period") period: string
  ) {
    return this.service.getEngagementInsights(Number(userId), period || "thisMonth");
  }

  @Get("views-vs-bookings")
  getViewsVsBookings(
    @Query("userId") userId: string,
    @Query("period") period: string
  ) {
    return this.service.getViewsVsBookings(Number(userId), period || "thisMonth");
  }

  @Post("simulate-view/:id")
  simulate(
    @Param("id") id: string,
    @Query("userId") userId: string
  ) {
    return this.service.simulateListingView(
      Number(id),
      Number(userId)
    );
  }

}