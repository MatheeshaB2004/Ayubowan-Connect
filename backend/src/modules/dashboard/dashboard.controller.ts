import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Req,
  Query,
  Param,
  ParseIntPipe
} from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('dashboard/vendor')
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

  @Get("event-overview")
  getEventOverview(@Query("userId") userId: string) {
    return this.service.getEventOverview(Number(userId));
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

  @Get("stats")
  getStats(@Query("userId") userId: string) {
    return this.service.getDashboardStats(Number(userId));
  }

  @Get("rating-summary")
  getDashboardRating(@Query("userId") userId: string) {
    return this.service.getDashboardRating(Number(userId));
  }

  @Get("reviews")
  getVendorReviews(@Query("userId") userId: number) {
    return this.service.getVendorReviews(Number(userId));
  }

  @Get("listings")
  getVendorListings(@Query("userId", ParseIntPipe) userId: number) {
    return this.service.getVendorListings(userId);
  }

  @Post("availability")
  saveAvailability(@Body() body: any) {
    return this.service.saveAvailability(body.userId, body.dates);
  }

  @Get("availability")
  getAvailability(
    @Query("userId") userId: string,
    @Query("month") month: string
  ) {
    return this.service.getAvailability(Number(userId), month);
  }
  @Delete("availability/previous")
  deletePreviousAvailability(@Query("userId") userId: string) {
    return this.service.deletePreviousAvailability(Number(userId));
  }

  @Delete("availability")
  deleteAvailability(
    @Query("userId") userId: string,
    @Query("month") month: string
  ) {
    return this.service.deleteAvailabilityForMonth(
      Number(userId),
      month
    );
  }

  @Post("reply")
  async reply(@Body() body: any) {
    console.log("Reply request:", body);

    const { reviewId, reply } = body;

    return this.service.replyToReview(reviewId, reply);

  }

  @Post("delete-reply")
  deleteReply(@Body() body: any) {

    return this.service.deleteReply(body.reviewId)

  }
}


