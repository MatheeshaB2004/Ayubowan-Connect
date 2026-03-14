import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { BadRequestException } from '@nestjs/common';

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

    //Count Events 
    const currentEvents = await this.prisma.event.count({
      where: {
        vendorId: vendor.id,
        createdAt: {
          gte: start,
          lt: end,
        },
      },
    });

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
      events: currentEvents,

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

    /*const listings = await this.prisma.listing.findMany({
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
    });*/
    // Temp mock data to test
    const listings = [
      {
        title: "New Low",
        bookings: Array(20).fill({}),
        createdAt: new Date(Date.now() - 5 * 86400000), // 5 days old
      },
      {
        title: "New High",
        bookings: Array(12).fill({}),
        createdAt: new Date(Date.now() - 5 * 86400000), // 5 days old
      },
      {
        title: "Old Low",
        bookings: Array(3).fill({}),
        createdAt: new Date(Date.now() - 30 * 86400000), // 30 days old
      },
      {
        title: "Old Average",
        bookings: Array(7).fill({}),
        createdAt: new Date(Date.now() - 30 * 86400000), // 30 days old
      },
      {
        title: "Old Strong",
        bookings: Array(15).fill({}),
        createdAt: new Date(Date.now() - 30 * 86400000), // 30 days old
      },
    ];

    const mapped = listings.map(l => ({
      name: l.title,
      bookings: l.bookings.length,
      createdAt: l.createdAt,
    }));

    mapped.sort((a, b) => b.bookings - a.bookings);

    const maxBookings = mapped[0]?.bookings || 0;

    // PERIOD-BASED THRESHOLDS

    let minAverage = 5;
    let minStrong = 10;
    let newWindow = 14;

    if (period === "lastQuarter") {
      minAverage = 15;
      minStrong = 30;
      newWindow = 30;
    }

    // TAGGING

    return mapped.slice(0, 5).map(l => {
      const ratio = maxBookings > 0 ? l.bookings / maxBookings : 0;

      const daysOld =
        (Date.now() - l.createdAt.getTime()) /
        (1000 * 60 * 60 * 24);

      let performance:
        | "high"
        | "strong"
        | "average"
        | "needs-improvement";

      // PERFORMANCE TIER
      if (l.bookings >= minStrong && ratio >= 0.8) {
        performance = "high";
      } else if (l.bookings >= minStrong) {
        performance = "strong";
      } else if (l.bookings >= minAverage) {
        performance = "average";
      } else {
        performance = "needs-improvement";
      }

      // NEW LOGIC
      let tags: string[] = [];

      if (daysOld <= newWindow) {
        if (l.bookings < minAverage) {
          tags = ["new"];
        } else {
          tags = ["new", performance];
        }
      } else {
        tags = [performance];
      }

      return {
        name: l.name,
        bookings: l.bookings,
        maxBookings: maxBookings || 1,
        tags,
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

  async getEngagementInsights(userId: number, period: string) {
    const vendor = await this.prisma.vendor.findUnique({
      where: { userId },
      include: { locations: true },
    });

    if (!vendor) throw new Error("Vendor not found");

    const city = vendor.locations[0]?.city;

    const now = new Date();
    let start = new Date();

    if (period === "thisMonth") start = new Date(now.getFullYear(), now.getMonth(), 1);
    if (period === "last30Days") start.setDate(now.getDate() - 30);
    if (period === "lastQuarter") start.setMonth(now.getMonth() - 3);

    // Card 1 — Demand Pattern

    const bookings = await this.prisma.booking.findMany({
      where: {
        listing: { vendorId: vendor.id },
        createdAt: { gte: start },
      },
      select: { createdAt: true },
    });

    let timingInsight = "Early bookings shape your demand pattern — stay visible.";

    const minBookings = period === "lastQuarter" ? 10 : 5;

    if (bookings.length >= minBookings) {
      const bucket: Record<string, number> = {};

      bookings.forEach(b => {
        const key =
          period === "lastQuarter"
            ? b.createdAt.toLocaleString("default", { month: "long" })
            : b.createdAt.toLocaleString("default", { weekday: "long" });

        bucket[key] = (bucket[key] || 0) + 1;
      });

      const entries = Object.entries(bucket);
      const max = Math.max(...entries.map(e => e[1]));
      const winners = entries.filter(e => e[1] === max).map(e => e[0]);

      if (winners.length === 1 && max / bookings.length >= 0.4) {
        timingInsight =
          period === "lastQuarter"
            ? `${winners[0]} generated most of your bookings`
            : `Most bookings happen on ${winners[0]}`;
      } else if (winners.length === 2) {
        timingInsight =
          period === "lastQuarter"
            ? `${winners[0]} and ${winners[1]} drove most of your bookings`
            : `Most bookings happen on ${winners[0]} and ${winners[1]}`;
      } else {
        timingInsight =
          period === "lastQuarter"
            ? "Your bookings show similar peak activity across multiple months."
            : "Your bookings show similar peak activity across multiple days.";
      }
    } else if (bookings.length > 0) {
      timingInsight = "Your bookings are still forming a pattern — consistency reveals peak days.";
    }

    // Card 2 — Price Positioning

    const myListings = await this.prisma.listing.findMany({
      where: { vendorId: vendor.id },
      select: { priceMin: true },
    });

    const myAvg =
      myListings.reduce((s, l) => s + l.priceMin, 0) / (myListings.length || 1);

    const competitors = await this.prisma.listing.findMany({
      where: {
        vendorId: { not: vendor.id },
        location: { city },
        priceMin: { gt: 0 }
      },
      select: { priceMin: true },
    });

    let priceInsight = "You are the only vendor operating in this area.";

    if (competitors.length) {
      const marketAvg =
        competitors.reduce((s, l) => s + l.priceMin, 0) / (competitors.length || 1);

      let diff = 0;

      if (marketAvg > 0) {
        const rawDiff = ((myAvg - marketAvg) / marketAvg) * 100;
        diff = Math.max(0, Math.min(Math.round(rawDiff), 100));

        priceInsight =
          diff > 0
            ? `You are priced ${diff}% higher than vendors in ${city}`
            : `You are priced ${Math.abs(diff)}% lower than vendors in ${city}`;
      } else {
        priceInsight = `Pricing insights are not available yet for vendors in ${city}.`;
      }
    }

    // ───────────── Card 3 — Revenue + Lost Revenue

    const earned = await this.prisma.booking.aggregate({
      where: {
        listing: { vendorId: vendor.id },
        createdAt: { gte: start },
        status: "CONFIRMED",
      },
      _sum: { totalPrice: true },
    });

    const lost = await this.prisma.booking.aggregate({
      where: {
        listing: { vendorId: vendor.id },
        createdAt: { gte: start },
        status: { in: ["CANCELLED", "REJECTED"] },
      },
      _sum: { totalPrice: true },
    });

    const revenue = Math.round(earned._sum.totalPrice || 0);
    const lostRevenue = Math.round(lost._sum.totalPrice || 0);

    let revenueInsight = `Your Estimated revenue is : LKR ${revenue}.`;

    if (lostRevenue > 0) {
      revenueInsight += ` You missed LKR ${lostRevenue} from cancelled or rejected bookings.`;
    }
    return [
      { text: timingInsight },
      { text: priceInsight },
      { text: revenueInsight },
    ];
  }

  async getViewsVsBookings(userId: number, period: string) {
    const vendor = await this.prisma.vendor.findUnique({
      where: { userId },
    });

    if (!vendor) throw new Error("Vendor not found");

    const now = new Date();
    let start = new Date();

    if (period === "thisMonth")
      start = new Date(now.getFullYear(), now.getMonth(), 1);

    if (period === "last30Days")
      start = new Date(now.getTime() - 30 * 86400000);

    if (period === "lastQuarter")
      start = new Date(now.getTime() - 90 * 86400000);

    // vendor listing ids
    const listings = await this.prisma.listing.findMany({
      where: { vendorId: vendor.id },
      select: { id: true },
    });

    const listingIds = listings.map(l => l.id);

    // listing views
    const views = await this.prisma.listingView.findMany({
      where: {
        listingId: { in: listingIds },
        createdAt: { gte: start },
      },
      select: { createdAt: true },
    });

    // bookings
    const bookings = await this.prisma.booking.findMany({
      where: {
        listingId: { in: listingIds },
        createdAt: { gte: start },
      },
      select: { createdAt: true },
    });

    const bucket: Record<string, { views: number; bookings: number }> = {};

    const key = (d: Date) => d.toLocaleDateString("en-CA");

    views.forEach(v => {
      const k = key(v.createdAt);
      bucket[k] ??= { views: 0, bookings: 0 };
      bucket[k].views++;
    });

    bookings.forEach(b => {
      const k = key(b.createdAt);
      bucket[k] ??= { views: 0, bookings: 0 };
      bucket[k].bookings++;
    });

    const result: { week: string; views: number; bookings: number }[] = [];
    const cur = new Date(start);

    while (cur <= now) {
      const k = key(cur);
      result.push({
        week: k,
        views: bucket[k]?.views || 0,
        bookings: bucket[k]?.bookings || 0,
      });
      cur.setDate(cur.getDate() + 1);
    }

    // calculate totals
    const totalViews = result.reduce((sum, r) => sum + r.views, 0);
    const totalBookings = result.reduce((sum, r) => sum + r.bookings, 0);

    let conversionRate = 0;

    if (totalViews > 0) {
      conversionRate = Math.round((totalBookings / totalViews) * 100);
    }

    return {
      data: result,
      totalViews,
      totalBookings,
      conversionRate,
    };
  }

  async simulateListingView(listingId: number, userId: number) {

    const localTourist = await this.prisma.localTourist.findUnique({
      where: { userId },
    });

    if (!localTourist) {
      throw new ForbiddenException("Only locals or tourists can view listings");
    }

    return this.prisma.listingView.create({
      data: {
        listingId,
        userId,
      },
    });
  }

  async getEventOverview(userId: number) {
    const vendor = await this.prisma.vendor.findUnique({
      where: { userId },
    });

    if (!vendor) throw new Error("Vendor not found");

    const now = new Date();

    const events = await this.prisma.event.findMany({
      where: {
        vendorId: vendor.id,
      },
      select: {
        id: true,
        startDate: true,
        endDate: true,
        createdAt: true,
      },
    });

    const total = events.length;

    if (total === 0) {
      return {
        total: 0,
        upcomingCount: 0,
        completedCount: 0,
        upcomingMessage: "You haven't created any events.",
        completedMessage: "You don't have any completed events.",
      };
    }

    const upcoming = events.filter(
      e => e.startDate > now
    );
    const completed = events.filter(
      e => e.endDate && e.endDate < now
    );

    const upcomingCount = upcoming.length;
    const completedCount = completed.length;

    // ---- Upcoming Message
    let upcomingMessage = "";

    if (upcomingCount === 0) {
      upcomingMessage = "You have no upcoming events.";
    } else {
      upcomingMessage = `You have ${upcomingCount} upcoming event${upcomingCount > 1 ? "s" : ""}.`;
    }

    // ---- Completed Message
    let completedMessage = "";

    if (completedCount === 0) {
      completedMessage = "You don't have any completed events.";
    } else if (completedCount === total) {
      completedMessage = `All ${total} events have been completed.`;
    } else {
      completedMessage = `${completedCount} out of ${total} events have completed.`;
    }

    return {
      total,
      upcomingCount,
      completedCount,
      upcomingMessage,
      completedMessage,
    };
  }

  async getDashboardStats(userId: number) {
    const vendor = await this.prisma.vendor.findUnique({
      where: { userId },
    });

    if (!vendor) throw new Error("Vendor not found");

    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 1);

    const activeListings = await this.prisma.listing.count({
      where: {
        vendorId: vendor.id,
        visibilityStatus: "PUBLISHED",
      },
    });

    const pendingBookings = await this.prisma.booking.count({
      where: {
        status: "PENDING",
        listing: {
          vendorId: vendor.id,
        },
      },
    });

    const completedBookings = await this.prisma.booking.count({
      where: {
        status: "COMPLETED",
        listing: {
          vendorId: vendor.id,
        },
      },
    });

    const events = await this.prisma.event.count({
      where: {
        vendorId: vendor.id,
        createdAt: {
          gte: start,
          lt: end,
        },
      },
    });

    return {
      activeListings,
      pendingBookings,
      completedBookings,
      events,
    };
  }
  async getDashboardRating(userId: number) {
    const vendor = await this.prisma.vendor.findUnique({
      where: { userId },
    });

    if (!vendor) throw new Error("Vendor not found");

    const reviews = await this.prisma.review.findMany({
      where: {
        listing: { vendorId: vendor.id },
      },
      select: { rating: true },
    });

    const totalReviews = reviews.length;

    if (!totalReviews) {
      return {
        avgRating: 0,
        totalReviews: 0,
        percentages: {
          5: 0,
          4: 0,
          3: 0,
          2: 0,
          1: 0,
        },
      };
    }

    const avgRating =
      reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews;

    const stars = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };

    reviews.forEach((r) => {
      stars[r.rating]++;
    });

    const percentages = {
      5: Math.round((stars[5] / totalReviews) * 100),
      4: Math.round((stars[4] / totalReviews) * 100),
      3: Math.round((stars[3] / totalReviews) * 100),
      2: Math.round((stars[2] / totalReviews) * 100),
      1: Math.round((stars[1] / totalReviews) * 100),
    };

    return {
      avgRating: Number(avgRating.toFixed(1)),
      totalReviews,
      percentages,
    };
  }

  async getVendorReviews(userId: number) {
    const vendor = await this.prisma.vendor.findUnique({
      where: { userId },
    });

    if (!vendor) throw new Error("Vendor not found");

    const reviews = await this.prisma.review.findMany({
      where: {
        listing: {
          vendorId: vendor.id,
        },
      },
      include: {
        user: {
          select: {
            fullName: true,
          },
        },
        listing: {
          select: {
            title: true,
          },
        },
        media: true
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return reviews;
  }

  async replyToReview(reviewId: number, reply: string) {

    return this.prisma.review.update({
      where: {
        id: reviewId
      },
      data: {
        reply: reply
      }
    });

  }

  async deleteReply(reviewId: number) {

    return this.prisma.review.update({
      where: { id: reviewId },
      data: { reply: null }
    })

  }

  /*async replyToReview(reviewId: number, reply: string) {
    return this.prisma.review.update({
      where: { id: reviewId },
      data: {
        reply,
        replyAt: new Date(),
      },
    });
  }*/

  async getVendorListings(userId: number) {
    const vendor = await this.prisma.vendor.findUnique({
      where: { userId },
    });

    if (!vendor) throw new Error("Vendor not found");

    const listings = await this.prisma.listing.findMany({
      where: {
        vendorId: vendor.id,
        visibilityStatus: "PUBLISHED",
      },
      include: {
        media: {
          where: { isPrimary: true },
          take: 1,
        },

        location: true,

        category: {
          select: {
            categoryName: true,
          },
        },

        reviews: {
          select: { rating: true },
        },
        _count: {
          select: { reviews: true },
        },
      },
    });

    return listings.map((listing) => {
      const reviewCount = listing._count.reviews;

      const avgRating =
        reviewCount > 0
          ? (
            listing.reviews.reduce((sum, r) => sum + r.rating, 0) /
            reviewCount
          ).toFixed(1)
          : 0;

      return {
        id: listing.id,

        title: listing.title,

        city: listing.location?.city || null,

        categoryName: listing.category?.categoryName || null,

        tags: listing.tags || [],

        capacity: listing.capacity || null,

        priceMin: listing.priceMin || 0,

        image: listing.media[0]?.mediaUrl || null,

        avgRating: Number(avgRating),

        reviewCount,
      };
    });
  }

  async saveAvailability(userId: number, dates: any[]) {
    const vendor = await this.prisma.vendor.findUnique({
      where: { userId }
    });

    if (!vendor) throw new Error("Vendor not found");

    const pad = (n: number) => String(n).padStart(2, "0");

    for (const d of dates) {
      if (!d.date || !Array.isArray(d.slots)) continue;

      const dateObj = new Date(d.date);
      dateObj.setUTCHours(0, 0, 0, 0);

      let availability = await this.prisma.vendorAvailability.findFirst({
        where: {
          vendorId: vendor.id,
          date: {
            gte: dateObj,
            lt: new Date(dateObj.getTime() + 86400000)
          }
        },
        include: { slots: true }
      });

      if (!availability) {
        availability = await this.prisma.vendorAvailability.create({
          data: {
            vendorId: vendor.id,
            date: dateObj
          },
          include: { slots: true }
        });
      }

      const existingSlots = availability.slots || [];
      const existingIds = existingSlots.map(s => s.id);

      // We will track the IDs we want to KEEP in the database.
      const incomingIds: number[] = [];

      // PROCESS EACH SLOT
      for (const slot of d.slots) {
        if (!slot.start || !slot.end) continue;

        const [startH, startM] = slot.start.split(":").map(Number);
        const [endH, endM] = slot.end.split(":").map(Number);

        const startDate = new Date(d.date);
        startDate.setUTCHours(startH, startM, 0, 0);

        const endDate = new Date(d.date);
        endDate.setUTCHours(endH, endM, 0, 0);

        // Safely parse the ID, even if the frontend sends it as a string
        const slotId = slot.id != null ? Number(slot.id) : null;

        // UPDATE EXISTING SLOT IF ID IS MATCHED
        if (slotId && !isNaN(slotId)) {
          const existing = existingSlots.find(s => s.id === slotId);
          if (existing) {
            incomingIds.push(slotId); // Mark to keep

            const existingStart = `${pad(existing.startTime.getUTCHours())}:${pad(existing.startTime.getUTCMinutes())}`;
            const existingEnd = `${pad(existing.endTime.getUTCHours())}:${pad(existing.endTime.getUTCMinutes())}`;

            if (existingStart !== slot.start || existingEnd !== slot.end) {
              await this.prisma.availabilitySlot.update({
                where: { id: slotId },
                data: { startTime: startDate, endTime: endDate }
              });
            }
            continue; 
          }
        }

    
        const duplicate = existingSlots.find(s => {
          const sStart = `${pad(s.startTime.getUTCHours())}:${pad(s.startTime.getUTCMinutes())}`;
          const sEnd = `${pad(s.endTime.getUTCHours())}:${pad(s.endTime.getUTCMinutes())}`;
          return sStart === slot.start && sEnd === slot.end;
        });

        
        if (duplicate) {
          incomingIds.push(duplicate.id); // Mark duplicate's ID to keep
          continue;
        }

        // It is genuinely a brand new slot.
        await this.prisma.availabilitySlot.create({
          data: {
            availabilityId: availability.id,
            startTime: startDate,
            endTime: endDate
          }
        });
      }

      // DELETE REMOVED SLOTS (Using all preserved IDs)
      const removedIds = existingIds.filter(id => !incomingIds.includes(id));
      if (removedIds.length > 0) {
        await this.prisma.availabilitySlot.deleteMany({
          where: { id: { in: removedIds } }
        });
      }
    }

    return { message: "Availability saved successfully" };
  }


  async getAvailability(userId: number, month: string) {

    const vendor = await this.prisma.vendor.findUnique({
      where: { userId }
    });

    if (!vendor) throw new Error("Vendor not found");

    const input = new Date(month);
    const start = new Date(input.getFullYear(), input.getMonth(), 1);
    const end = new Date(input.getFullYear(), input.getMonth() + 1, 1);

    const dates = await this.prisma.vendorAvailability.findMany({
      where: {
        vendorId: vendor.id,
        date: { gte: start, lt: end }
      },
      include: { slots: true }
    });

    const pad = (n: number) => String(n).padStart(2, "0");

    return dates.map(d => ({
      date: d.date,
      slots: d.slots.map(s => ({
        id: s.id,

        start: `${pad(s.startTime.getUTCHours())}:${pad(s.startTime.getUTCMinutes())}`,
        end: `${pad(s.endTime.getUTCHours())}:${pad(s.endTime.getUTCMinutes())}`,
      }))
    }));
  }

  async deletePreviousAvailability(userId: number) {

    const vendor = await this.prisma.vendor.findUnique({
      where: { userId }
    });

    if (!vendor) throw new Error("Vendor not found");

    const now = new Date();
    //const now = new Date(2026, 3, 1);

    const startOfCurrentMonth = new Date(
      now.getFullYear(),
      now.getMonth(),
      1
    );

    // find all previous month availability
    const records = await this.prisma.vendorAvailability.findMany({
      where: {
        vendorId: vendor.id,
        date: {
          lt: startOfCurrentMonth
        }
      }
    });

    const ids = records.map(r => r.id);
    console.log("Deleting availability IDs:", ids);

    if (ids.length === 0) {
      return { message: "No previous availability found" };
    }

    // delete slots first
    await this.prisma.availabilitySlot.deleteMany({
      where: {
        availabilityId: {
          in: ids
        }
      }
    });

    // delete availability rows
    await this.prisma.vendorAvailability.deleteMany({
      where: {
        id: {
          in: ids
        }
      }
    });

    return { message: "Previous month availability deleted" };
  }

  async deleteAvailabilityForMonth(userId: number, month: string) {
    console.log("DELETE MONTH AVAILABILITY CALLED");

    const vendor = await this.prisma.vendor.findUnique({
      where: { userId }
    });

    if (!vendor) throw new Error("Vendor not found");

    const input = new Date(month);

    const start = new Date(input.getFullYear(), input.getMonth(), 1);
    const end = new Date(input.getFullYear(), input.getMonth() + 1, 1);

    // find availability rows
    const records = await this.prisma.vendorAvailability.findMany({
      where: {
        vendorId: vendor.id,
        date: {
          gte: start,
          lt: end
        }
      }
    });

    const ids = records.map(r => r.id);

    // delete slots first
    await this.prisma.availabilitySlot.deleteMany({
      where: {
        availabilityId: { in: ids }
      }
    });

    // then delete availability
    return this.prisma.vendorAvailability.deleteMany({
      where: {
        id: { in: ids }
      }
    });
  }

  async getVendorBookings(userId: number) {

    const vendor = await this.prisma.vendor.findUnique({
      where: { userId }
    });

    if (!vendor) throw new Error("Vendor not found");

    const now = new Date();
    // temp data - const now = new Date("2026-03-07");

    const startOfMonth = new Date(
      now.getFullYear(),
      now.getMonth(),
      1
    );

    const startOfNextMonth = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      1
    );

    const bookings = await this.prisma.booking.findMany({
      where: {
        vendorId: vendor.id,
        createdAt: {
          gte: startOfMonth,
          lt: startOfNextMonth
        }
      },
      include: {
        listing: {
          select: {
            title: true
          }
        },
        localTourist: {
          include: {
            user: true
          }
        }
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    // collect slot ids
    const slotIds = bookings
      .map(b => b.slotId)
      .filter((id): id is number => id !== null);

    // fetch slots
    const slots = await this.prisma.availabilitySlot.findMany({
      where: {
        id: { in: slotIds }
      },
      select: {
        id: true,
        startTime: true,
        endTime: true,
        maxGuests: true,
        bookedGuests: true
      }
    });

    // create slot map
    const slotMap = Object.fromEntries(
      slots.map(s => [s.id, s])
    );

    // map bookings
    return bookings.map(b => {

      const slot = b.slotId ? slotMap[b.slotId] : null;

      return {
        ...b,
        slot: slot
          ? {
            date: slot.startTime.toISOString().slice(0, 10),
            startTime: slot.startTime.toISOString().slice(11, 16),
            endTime: slot.endTime.toISOString().slice(11, 16),
            maxGuests: slot.maxGuests,
            bookedGuests: slot.bookedGuests,
            remaining: slot.maxGuests - slot.bookedGuests,
            isFull: slot.bookedGuests >= slot.maxGuests
          }
          : null
      };
    });
  }
  async acceptBooking(id: number) {

    const booking = await this.prisma.booking.findUnique({
      where: { id }
    });

    if (!booking) {
      throw new Error("Booking not found");
    }

    if (booking.status !== "PENDING") {
      throw new Error("Booking already processed");
    }

    if (booking.slotId) {

      await this.prisma.$transaction(async (tx) => {

        const slot = await tx.availabilitySlot.findUnique({
          where: { id: booking.slotId! }
        });

        if (!slot) {
          throw new Error("Slot not found");
        }

        if (slot.bookedGuests >= slot.maxGuests) {
          throw new BadRequestException("Slot already full");
        }

        if (slot.bookedGuests + booking.guests > slot.maxGuests) {
          throw new BadRequestException("Slot capacity exceeded");
        }

        await tx.availabilitySlot.update({
          where: { id: slot.id },
          data: {
            bookedGuests: {
              increment: booking.guests
            }
          }
        });

      });

    }

    return this.prisma.booking.update({
      where: { id },
      data: {
        status: "CONFIRMED",
        approvedAt: new Date()
      }
    });

  }

  async rejectBooking(id: number) {

    const booking = await this.prisma.booking.findUnique({
      where: { id }
    });

    if (!booking) throw new Error("Booking not found");

    if (booking.status !== "PENDING") {
      throw new Error("Booking already processed");
    }

    return this.prisma.booking.update({
      where: { id },
      data: {
        status: "REJECTED",
        approvedAt: new Date()
      }
    });

  }

  async completeBooking(id: number) {

    const booking = await this.prisma.booking.findUnique({
      where: { id }
    });

    if (!booking) {
      throw new Error("Booking not found");
    }

    if (booking.status !== "CONFIRMED") {
      throw new Error("Only confirmed bookings can be completed");
    }

    return this.prisma.booking.update({
      where: { id },
      data: {
        status: "COMPLETED"
      }
    });

  }

}