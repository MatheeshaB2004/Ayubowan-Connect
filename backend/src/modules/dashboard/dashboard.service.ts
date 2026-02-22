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
}