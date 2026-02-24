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

  async getVendorSummary(userId: number) {
    const vendor = await this.prisma.vendor.findUnique({
      where: { userId },
    });

    if (!vendor) throw new Error('Vendor not found');

    // Experiences
    const experiences = await this.prisma.listing.count({
      where: {
        vendorId: vendor.id,
        listingType: 'EXPERIENCE',
      },
    });

    // Products
    const products = await this.prisma.listing.count({
      where: {
        vendorId: vendor.id,
        listingType: 'PRODUCT',
      },
    });

    // Bookings (through listing → vendor)
    const bookings = await this.prisma.booking.count({
      where: {
        listing: {
          vendorId: vendor.id,
        },
      },
    });

    // Estimated Revenue
    const revenueAgg = await this.prisma.booking.aggregate({
      where: {
        listing: {
          vendorId: vendor.id,
        },
      },
      _sum: {
        totalPrice: true,
      },
    });

    const reviews = await this.prisma.review.aggregate({
      _count: true,
      _avg: {
        rating: true,
      },
      where: {
        listing: {
          vendorId: vendor.id,
        },
      },
    });

    const totalReviews = reviews._count;
    const avgRating = Number(reviews._avg.rating || 0).toFixed(1);

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

    const listingsCount = await this.prisma.listing.count({
      where: {
        vendorId: vendor.id,
      },
    });

    return {
      experiences,
      products,
      bookings,
      estimatedRevenue: revenueAgg._sum.totalPrice || 0,

      listings: listingsCount,
      reviews: totalReviews,
      avgRating,
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

}