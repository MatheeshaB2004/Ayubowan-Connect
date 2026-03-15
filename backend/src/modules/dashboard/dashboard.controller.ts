import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Query,
  Param
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { DashboardService } from './dashboard.service';
import { NotFoundException } from '@nestjs/common';

@Controller('dashboard/vendor')
export class DashboardController {
  constructor(private readonly service: DashboardService,
    private readonly prisma: PrismaService
  ) { }

  private async getUserIdFromClerk(clerkUserId: string) {
    const vendor = await this.prisma.vendor.findUnique({
      where: { clerkUserId }
    });

    if (!vendor) {
      throw new NotFoundException("Vendor not found");
    }

    return vendor.userId;
  }


  // CREATE GOAL
  @Post('goal')
  async createGoal(@Body() body: { userId: string; target: number }) {

    const userId = await this.getUserIdFromClerk(body.userId);

    return this.service.createGoal(userId, body.target);
  }

  // GET DASHBOARD
  @Get()
  async getDashboard(@Query('userId') clerkUserId: string) {
    const userId = await this.getUserIdFromClerk(clerkUserId);
    return this.service.getDashboard(userId);
  }

  // INCREASE GOAL
  @Patch('goal')
  async increaseGoal(@Body() body: { userId: string; target: number }) {

    const userId = await this.getUserIdFromClerk(body.userId);

    return this.service.increaseGoal(userId, body.target);
  }

  // DELETE GOAL
  @Delete('goal')
  async deleteGoal(@Body() body: { userId: string }) {

    const userId = await this.getUserIdFromClerk(body.userId);

    return this.service.deleteGoal(userId);
  }

  @Get('summary')
  async getSummary(
    @Query('userId') clerkUserId: string,
    @Query('period') period: string,
  ) {
    const userId = await this.getUserIdFromClerk(clerkUserId);
    return this.service.getVendorSummary(userId, period || "thisMonth");
  }

  @Get("booking-trend")
  async getBookingTrend(
    @Query("userId") clerkUserId: string,
    @Query("period") period: string
  ) {
    const userId = await this.getUserIdFromClerk(clerkUserId);

    return this.service.getBookingTrend(
      userId,
      period
    );
  }

  @Get("top-listings")
  async getTopListings(
    @Query("userId") clerkUserId: string,
    @Query("period") period: string
  ) {
    const userId = await this.getUserIdFromClerk(clerkUserId);

    return this.service.getTopListings(userId, period || "thisMonth");
  }

  @Get("ratings")
  async getRatings(
    @Query("userId") clerkUserId: string,
    @Query("period") period: string
  ) {
    const userId = await this.getUserIdFromClerk(clerkUserId);

    return this.service.getRatingAnalytics(userId, period || "thisMonth");
  }

  @Get("insights")
  async getInsights(
    @Query("userId") clerkUserId: string,
    @Query("period") period: string
  ) {
    const userId = await this.getUserIdFromClerk(clerkUserId);

    return this.service.getEngagementInsights(userId, period || "thisMonth");
  }

  @Get("views-vs-bookings")
  async getViewsVsBookings(
    @Query("userId") clerkUserId: string,
    @Query("period") period: string
  ) {
    const userId = await this.getUserIdFromClerk(clerkUserId);

    return this.service.getViewsVsBookings(userId, period || "thisMonth");
  }

  @Get("event-overview")
  async getEventOverview(@Query("userId") clerkUserId: string) {

    const userId = await this.getUserIdFromClerk(clerkUserId);

    return this.service.getEventOverview(userId);
  }

  @Post("simulate-view/:id")
  async simulate(
    @Param("id") id: string,
    @Query("userId") clerkUserId?: string
    
  ) {
    console.log("SIMULATE VIEW CALLED → listing:", id, "time:", new Date());
    let userId: number | undefined = undefined;

    if (clerkUserId) {

      const user = await this.prisma.user.findFirst({
        where: { email: clerkUserId } // because you store Clerk ID in email
      });
      console.log("CLERK USER ID FROM FRONTEND:", clerkUserId);

      if (user) {

        // Check if that user is a LocalTourist
        const tourist = await this.prisma.localTourist.findUnique({
          where: { userId: user.id }
        });

        if (tourist) {
          userId = user.id;
        }

      }


    }

    return this.service.simulateListingView(Number(id), userId);
  }


  @Get("stats")
  async getStats(@Query("userId") clerkUserId: string) {
    const userId = await this.getUserIdFromClerk(clerkUserId);
    return this.service.getDashboardStats(userId);
  }

  @Get("rating-summary")
  async getDashboardRating(@Query("userId") clerkUserId: string) {

    const userId = await this.getUserIdFromClerk(clerkUserId);

    return this.service.getDashboardRating(userId);
  }

  @Get("reviews")
  async getVendorReviews(@Query("userId") clerkUserId: string) {

    const userId = await this.getUserIdFromClerk(clerkUserId);

    return this.service.getVendorReviews(userId);
  }

  @Get("listings")
  async getVendorListings(@Query("userId") clerkUserId: string) {

    const userId = await this.getUserIdFromClerk(clerkUserId);

    return this.service.getVendorListings(userId);
  }

  @Post("availability")
  async saveAvailability(@Body() body: any) {

    const userId = await this.getUserIdFromClerk(body.userId);

    return this.service.saveAvailability(userId, body.dates);
  }

  @Get("availability")
  async getAvailability(
    @Query("userId") clerkUserId: string,
    @Query("month") month: string
  ) {

    const userId = await this.getUserIdFromClerk(clerkUserId);

    return this.service.getAvailability(userId, month);
  }

  @Delete("availability/previous")
  async deletePreviousAvailability(@Query("userId") clerkUserId: string) {

    const userId = await this.getUserIdFromClerk(clerkUserId);

    return this.service.deletePreviousAvailability(userId);
  }

  @Delete("availability")
  async deleteAvailability(
    @Query("userId") clerkUserId: string,
    @Query("month") month: string
  ) {

    const userId = await this.getUserIdFromClerk(clerkUserId);

    return this.service.deleteAvailabilityForMonth(
      userId,
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

  @Get("bookings")
  async getBookings(@Query("userId") clerkUserId: string) {
    const userId = await this.getUserIdFromClerk(clerkUserId);
    return this.service.getVendorBookings(userId);
  }

  @Patch("booking/accept/:id")
  acceptBooking(@Param("id") id: string) {
    return this.service.acceptBooking(Number(id));
  }

  @Patch("booking/reject/:id")
  rejectBooking(@Param("id") id: string) {
    return this.service.rejectBooking(Number(id));
  }

  @Patch("booking/complete/:id")
  completeBooking(@Param("id") id: string) {
    return this.service.completeBooking(Number(id));
  }
}


