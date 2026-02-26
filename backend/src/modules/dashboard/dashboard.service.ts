import { Injectable,ForbiddenException } from '@nestjs/common';
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

    // ───────────── Card 1 — Demand Pattern

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
            ? "Your bookings were evenly distributed across multiple months"
            : "Your bookings are evenly distributed across multiple days";
      }
    } else if (bookings.length > 0) {
      timingInsight = "Your bookings are still forming a pattern — consistency reveals peak days.";
    }

    // ───────────── Card 2 — Price Positioning

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
      },
      select: { priceMin: true },
    });

    let priceInsight = "You are the only vendor operating in this area.";

    if (competitors.length) {
      const marketAvg =
        competitors.reduce((s, l) => s + l.priceMin, 0) / competitors.length;

      const diff = Math.round(((myAvg - marketAvg) / marketAvg) * 100);

      priceInsight =
        diff > 0
          ? `You are priced ${diff}% higher than vendors in ${city}`
          : `You are priced ${Math.abs(diff)}% lower than vendors in ${city}`;
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

    return result;
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




}