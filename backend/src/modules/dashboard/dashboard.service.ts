import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) { }

  // CREATE GOAL
  async createGoal(userId: number, target: number) {
    const vendor = await this.prisma.vendor.findUnique({
      where: { userId },
    });

    if (!vendor) throw new Error('Vendor not found');

    const totalBookings = await this.prisma.booking.count({
      where: {
        listing: {
          vendorId: vendor.id,
        },
      },
    });

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30);

    return this.prisma.goal.create({
      data: {
        vendorId: vendor.id,
        target,
        baselineBookings: totalBookings,
        expiresAt,
      },
    });
  }

  // GET DASHBOARD
  async getDashboard(userId: number) {
    const vendor = await this.prisma.vendor.findUnique({
      where: { userId },
    });

    if (!vendor) throw new Error('Vendor not found');

    const goal = await this.prisma.goal.findFirst({
      where: {
        vendorId: vendor.id,
        isActive: true,
      },
    });

    if (!goal) {
      return {
        goal: {
          exists: false,
          state: 'EMPTY',
        },
      };
    }

    const totalBookings = await this.prisma.booking.count({
      where: {
        listing: {
          vendorId: vendor.id,
        },
        createdAt: {
          gt: goal.createdAt,
        },
      },
    });

    const progress = totalBookings;

    const percentage = Math.min(
      Math.floor((progress / goal.target) * 100),
      100,
    );

    const exceeded =
      progress > goal.target ? progress - goal.target : 0;

    let state = 'ACTIVE';

    if (progress >= goal.target && exceeded === 0) state = 'ACHIEVED';
    if (exceeded > 0) state = 'SMASHED';

    return {
      goal: {
        exists: true,
        target: goal.target,
        current: progress,
        expiresAt: goal.expiresAt,
        remaining: progress >= goal.target ? 0 : goal.target - progress,
        exceeded,
        percentage,
        state,
      },
    };
  }
  // INCREASE GOAL
  async increaseGoal(userId: number, target: number) {
    const vendor = await this.prisma.vendor.findUnique({
      where: { userId },
    });

    if (!vendor) throw new Error('Vendor not found');

    return this.prisma.goal.updateMany({
      where: {
        vendorId: vendor.id,
        isActive: true,
      },
      data: {
        target,
      },
    });
  }

  // DELETE GOAL
  async deleteGoal(userId: number) {
    const vendor = await this.prisma.vendor.findUnique({
      where: { userId },
    });

    if (!vendor) throw new Error('Vendor not found');

    await this.prisma.goal.deleteMany({
      where: {
        vendorId: vendor.id,
        isActive: true,
      },
    });

    return { message: 'Goal deleted' };
  }

  async getVendorSummary(userId: number, period: string) {
    const vendor = await this.prisma.vendor.findUnique({
      where: { userId },
    });

    if (!vendor) throw new Error('Vendor not found');

    const now = new Date();
    let start = new Date();
    let prevStart = new Date();
    let prevEnd = new Date();
    let end = new Date();

    if (period === "thisMonth") {
      start = new Date(now.getFullYear(), now.getMonth(), 1);
      end = new Date(now.getFullYear(), now.getMonth() + 1, 1);

      prevEnd = new Date(start.getTime() - 1);
      prevStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    }

    if (period === "last30Days") {
      end = now;

      start = new Date(now);
      start.setDate(now.getDate() - 30);

      prevEnd = start;

      prevStart = new Date(start);
      prevStart.setDate(start.getDate() - 30);
    }

    if (period === "lastQuarter") {
      end = now;

      start = new Date(now);
      start.setMonth(now.getMonth() - 3);

      prevEnd = start;

      prevStart = new Date(start);
      prevStart.setMonth(start.getMonth() - 3);
    }
    //Profile Views
    const currentProfileViews = await this.prisma.profileView.count({
      where: {
        vendorId: vendor.id,
        createdAt: {
          gte: start,
          lt: end,
        },
      },
    });

    const previousProfileViews = await this.prisma.profileView.count({
      where: {
        vendorId: vendor.id,
        createdAt: {
          gte: prevStart,
          lt: prevEnd,
        },
      },
    });

    let profileViewsChange = 0;

    if (previousProfileViews === 0) {
      profileViewsChange = currentProfileViews > 0 ? -1 : 0;
    } else {
      const raw =
        ((currentProfileViews - previousProfileViews) /
          previousProfileViews) * 100;

      profileViewsChange = Math.min(Math.round(raw), 100);
    }

    const currentExperiences = await this.prisma.listing.count({
      where: {
        vendorId: vendor.id,
        listingType: 'EXPERIENCE',
        createdAt: { gte: start, lt: end },
      },
    });

    const currentProducts = await this.prisma.listing.count({
      where: {
        vendorId: vendor.id,
        listingType: 'PRODUCT',
        createdAt: { gte: start, lt: end },
      },
    });

    const previousExperiences = await this.prisma.listing.count({
      where: {
        vendorId: vendor.id,
        listingType: 'EXPERIENCE',
        createdAt: { gte: prevStart, lt: prevEnd },
      },
    });

    const previousProducts = await this.prisma.listing.count({
      where: {
        vendorId: vendor.id,
        listingType: 'PRODUCT',
        createdAt: { gte: prevStart, lt: prevEnd },
      },
    });

    const currentListings = currentExperiences + currentProducts;
    const previousListings = previousExperiences + previousProducts;

    let listingsChange = 0;

    if (previousListings === 0) {
      listingsChange = currentListings > 0 ? -1 : 0;
    } else {
      listingsChange = Math.min(
        Math.round(((currentListings - previousListings) / previousListings) * 100),
        100
      );
    }

    // Bookings 
    const currentBookings = await this.prisma.booking.count({
      where: {
        listing: { vendorId: vendor.id },
        createdAt: {
          gte: start,
          lt: end,
        },
      },
    });

    const previousBookings = await this.prisma.booking.count({
      where: {
        listing: { vendorId: vendor.id },
        createdAt: {
          gte: prevStart,
          lt: prevEnd,
        },
      },
    });

    let bookingsChange = 0;

    if (previousBookings === 0) {
      bookingsChange = currentBookings > 0 ? -1 : 0;
    } else {
      const raw =
        ((currentBookings - previousBookings) /
          previousBookings) * 100;

      bookingsChange = Math.min(Math.round(raw), 100);
    }

    // Estimated Revenue
    const revenueAgg = await this.prisma.booking.aggregate({
      where: {
        listing: { vendorId: vendor.id },
        createdAt: { gte: start },
      },
      _sum: { totalPrice: true },
    });

    const reviewsAgg = await this.prisma.review.aggregate({
      _count: true,
      _avg: { rating: true },
      where: {
        listing: { vendorId: vendor.id },
        createdAt: { gte: start, lt: end },
      },
    });

    const totalReviews = reviewsAgg._count;
    const avgRating = Number(reviewsAgg._avg.rating || 0).toFixed(1);

    const acceptedBookings = await this.prisma.booking.findMany({
      where: {
        status: 'CONFIRMED',
        listing: {
          vendorId: vendor.id,
        },
      },
      select: {
        createdAt: true,
        updatedAt: true,
      },
    });

    let avgResponseMinutes = 0;

    if (acceptedBookings.length) {
      const total = acceptedBookings.reduce((sum, b) => {
        return sum + (b.updatedAt.getTime() - b.createdAt.getTime());
      }, 0);

      avgResponseMinutes = Math.round(
        total / acceptedBookings.length / 60000
      );
    }

    const listingsCount = currentListings;

    return {
      experiences: currentExperiences,
      products: currentProducts,

      listings: currentListings,
      listingsChange,

      bookings: currentBookings,
      bookingsChange,

      profileViews: currentProfileViews,
      profileViewsChange,

      reviews: totalReviews,
      avgRating,

      estimatedRevenue: revenueAgg._sum.totalPrice || 0,
      avgResponseMinutes,
    };
  }

  async getBookingTrend(userId: number, period: string) {
    const vendor = await this.prisma.vendor.findUnique({
      where: { userId },
    });

    if (!vendor) throw new Error('Vendor not found');

    const now = new Date();
    let startDate = new Date();

    if (period === "thisMonth") {
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
    }

    if (period === "last30Days") {
      startDate.setDate(now.getDate() - 30);
    }

    if (period === "lastQuarter") {
      startDate.setMonth(now.getMonth() - 3);
    }

    const bookings = await this.prisma.booking.findMany({
      where: {
        listing: {
          vendorId: vendor.id,
        },
        createdAt: {
          gte: startDate,
        },
      },
      select: {
        createdAt: true,
      },
    });

    // Create a map of real booking counts
    const bookingMap: Record<string, number> = {};

    bookings.forEach((b) => {
      const key = b.createdAt.toLocaleDateString("en-CA");
      bookingMap[key] = (bookingMap[key] || 0) + 1;
    });

    // Generate all dates between startDate and today
    const result: { date: string; bookings: number }[] = [];

    const current = new Date(startDate);
    const end = new Date();

    while (current <= end) {
      const key = current.toLocaleDateString("en-CA");

      result.push({
        date: key,
        bookings: bookingMap[key] || 0, // fill missing days with 0
      });

      current.setDate(current.getDate() + 1);
    }

    return result;
  }

  async getTopListings(userId: number, period: string) {

    const vendor = await this.prisma.vendor.findUnique({
      where: { userId },
    });

    if (!vendor) throw new Error("Vendor not found");

    const now = new Date();
    let start = new Date();
    let end = new Date();

    if (period === "thisMonth") {
      start = new Date(now.getFullYear(), now.getMonth(), 1);
      end = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    }

    if (period === "last30Days") {
      end = now;
      start = new Date(now);
      start.setDate(now.getDate() - 30);
    }

    if (period === "lastQuarter") {
      end = now;
      start = new Date(now);
      start.setMonth(now.getMonth() - 3);
    }

    const listings = await this.prisma.listing.findMany({
      where: {
        vendorId: vendor.id,
        createdAt: {
          gte: start,
          lt: end
        },
      },
      include: {
        bookings: {
          where: { createdAt: { gte: start } },
        },
      },
    });

    const mapped = listings.map(l => ({
      name: l.title,
      bookings: l.bookings.length,
      createdAt: l.createdAt,
    }));

    mapped.sort((a, b) => b.bookings - a.bookings);

    const maxBookings = mapped[0]?.bookings || 1;

    return mapped.slice(0, 5).map(l => {
      let tag: "high" | "needs-improvement" | "new" = "needs-improvement";

      if (l.bookings === maxBookings) tag = "high";
      if (l.bookings === 0) tag = "new";

      return {
        name: l.name,
        bookings: l.bookings,
        maxBookings,
        tag,
      };
    });
  }

  async getRatingAnalytics(userId: number, period: string) {
    const vendor = await this.prisma.vendor.findUnique({
      where: { userId },
    });

    if (!vendor) throw new Error("Vendor not found");

    const now = new Date();
    let start = new Date();
    let end = new Date();

    if (period === "thisMonth") {
      start = new Date(now.getFullYear(), now.getMonth(), 1);
      end = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    }

    if (period === "last30Days") {
      end = now;
      start = new Date(now);
      start.setDate(now.getDate() - 30);
    }

    if (period === "lastQuarter") {
      end = now;
      start = new Date(now);
      start.setMonth(now.getMonth() - 3);
    }

    const reviews = await this.prisma.review.findMany({
      where: {
        listing: { vendorId: vendor.id },
        createdAt: { gte: start, lt: end },
      },
      select: { rating: true },
    });

    const totalReviews = reviews.length;

    if (!totalReviews) {
      return {
        avgRating: 0,
        totalReviews: 0,
        satisfaction: 0,
        breakdown: [5, 4, 3, 2, 1].map(s => ({
          stars: s,
          count: 0,
          percentage: 0,
        })),
      };
    }

    const sum = reviews.reduce((a, b) => a + b.rating, 0);
    const avgRating = Number((sum / totalReviews).toFixed(1));

    const positive = reviews.filter(r => r.rating >= 4).length;
    const satisfaction = Math.round((positive / totalReviews) * 100);

    const breakdown = [5, 4, 3, 2, 1].map(stars => {
      const count = reviews.filter(r => r.rating === stars).length;

      return {
        stars,
        count,
        percentage: Math.round((count / totalReviews) * 100),
      };
    });

    return {
      avgRating,
      totalReviews,
      satisfaction,
      breakdown,
    };
  }


}