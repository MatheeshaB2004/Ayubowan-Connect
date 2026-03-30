import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { ListingType } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class OrdersService {
  private readonly logger = new Logger(OrdersService.name);

  constructor(private prisma: PrismaService) {}

  /**
   * Resolve user ID with safe matching (email + ID fallbacks).
   * Uses email first, then clerkUserId, then placeholder, then numeric ID.
   */
  private async resolveUserId(rawUserId: string): Promise<number> {
    if (!rawUserId) {
      throw new Error('User ID is required');
    }

    // Try 1: Check if it's an email
    if (rawUserId.includes('@')) {
      const user = await this.prisma.user.findUnique({
        where: { email: rawUserId },
      });
      if (user) return user.id;
    }

    // Try 2: Check by clerkUserId (vendor table)
    const vendor = await this.prisma.vendor.findUnique({
      where: { clerkUserId: rawUserId },
    });
    if (vendor) return vendor.userId;

    // Try 3: Check placeholder emails
    const placeholderEmail = `clerk_${rawUserId}@placeholder.local`;
    let user = await this.prisma.user.findFirst({
      where: { email: placeholderEmail },
    });
    if (user) return user.id;

    // Try 4: Check if it's a numeric ID
    const parsed = Number(rawUserId);
    if (!isNaN(parsed) && Number.isInteger(parsed)) {
      user = await this.prisma.user.findUnique({
        where: { id: parsed },
      });
      if (user) return user.id;
    }

    throw new Error(`User not found for: ${rawUserId}`);
  }

  /**
   * Return completed orders for the given user.
   *
   * Since no dedicated Order table exists, we query the Booking table
   * for bookings with status COMPLETED or CONFIRMED and map them into
   * the shape the frontend expects.
   */
  async getUserOrders(email: string) {
    // Initialize bookingOrders for fallback
    let bookingOrders: any[] = [];

    try {
      const userId = await this.resolveUserId(email);

      // Fetch bookings
      const bookings = await this.prisma.booking.findMany({
        where: {
          localTouristId: userId,
          status: { in: ['COMPLETED', 'CONFIRMED'] },
        },
        include: {
          listing: true,
          vendor: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      // Create booking orders mapping (keep original)
      bookingOrders = bookings.map((b) => ({
        id: b.id,
        itemName: b.listing?.title ?? 'Unknown Item',
        vendorName: b.vendor?.businessName ?? 'Unknown Vendor',
        orderDate: b.bookingDate,
        amount: b.totalPrice,
        status: b.status === 'COMPLETED' ? 'COMPLETED' : 'PAID',
      }));

      // Fetch subscription data
      let subscriptionData: {
        isProUser: boolean;
        proSubscriptionExpiry: Date | null;
        updatedAt: Date;
      } | null = null;

      // Check if user is a vendor
      const vendor = await this.prisma.vendor.findFirst({
        where: { userId },
        select: {
          isProUser: true,
          proSubscriptionExpiry: true,
          updatedAt: true,
        },
      });

      if (vendor && vendor.isProUser) {
        subscriptionData = vendor;
      } else {
        // Check if user is a local tourist
        const localTourist = await this.prisma.localTourist.findFirst({
          where: { userId },
          select: {
            isProUser: true,
            proSubscriptionExpiry: true,
            updatedAt: true,
          },
        });

        if (localTourist && localTourist.isProUser) {
          subscriptionData = localTourist;
        }
      }

      // Create virtual subscription order if user has valid Pro subscription
      if (
        subscriptionData &&
        subscriptionData.isProUser &&
        subscriptionData.proSubscriptionExpiry &&
        subscriptionData.updatedAt
      ) {
        const expiry = subscriptionData.proSubscriptionExpiry;
        if (!expiry || Number.isNaN(expiry.getTime())) {
          return bookingOrders;
        }

        const now = new Date();
        const daysDiff = Math.ceil((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

        const billingCycle = daysDiff > 60 ? 'yearly' : 'monthly';

        // Calculate start date from expiry date
        const startDate = new Date(
          expiry.getTime() - (billingCycle === 'yearly' ? 365 : 30) * 24 * 60 * 60 * 1000
        );

        const subscriptionOrder = {
          id: -1, // Use number to match booking IDs
          itemName: 'Pro Subscription',
          vendorName: 'Ayubowan Connect',
          orderDate: startDate,
          amount: 0,
          status: 'COMPLETED',
          billingCycle,
          expiryDate: subscriptionData.proSubscriptionExpiry,
        };

        const allOrders = [subscriptionOrder, ...bookingOrders];
        return allOrders;
      }

      // Final fallback
      return bookingOrders;
    } catch (error) {
      console.error('OrdersService error:', error);
      // Return bookingOrders as safe fallback
      return bookingOrders;
    }
  }

  private determineBillingCycle(expiryDate: Date | null): 'monthly' | 'yearly' | null {
    if (!expiryDate) return null;

    const now = new Date();
    const daysDiff = Math.ceil((expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

    // If expired → no active plan
    if (daysDiff <= 0) return null;

    // If more than 60 days remaining → yearly
    if (daysDiff > 60) return 'yearly';

    // Otherwise treat as monthly
    return 'monthly';
  }

  async completeOrder(
    email: string,
    cartItems: Array<{
      listingId?: number | null;
      quantity?: number;
    }>,
  ) {
    const userId = await this.resolveUserId(email);
    console.log('Received cartItems:', cartItems);
    let updatedListings = 0;

    await this.prisma.$transaction(async (tx) => {
      for (const item of cartItems ?? []) {
        console.log('Processing cart item:', item);

        if (!item?.listingId) {
          console.log('Skipping item without listingId', item);
          continue;
        }
        if (!Number.isInteger(item.listingId)) {
          continue;
        }
        const quantity = Number(item?.quantity ?? 0);
        if (quantity <= 0) {
          continue;
        }

        const listing = await tx.listing.findUnique({
          where: { id: item.listingId },
          select: {
            id: true,
            listingType: true,
            stock: true,
          },
        });
        if (!listing) {
          console.log('Listing not found:', item.listingId);
          continue;
        }

        console.log('Listing ID:', listing.id);
        console.log('Processing listing:', listing.id);
        console.log('Listing type:', listing.listingType);

        if (listing.listingType !== ListingType.PRODUCT) {
          console.log('Skipping non-product listing:', listing.listingType);
          continue;
        }

        const currentStock = listing.stock ?? 0;
        console.log('Current stock:', currentStock);

        if (currentStock < quantity) {
          throw new BadRequestException(
            `Not enough stock for listing ${listing.id}`,
          );
        }

        console.log('Reducing stock by:', quantity);
        await tx.listing.update({
          where: { id: listing.id },
          data: {
            stock: {
              decrement: quantity,
            },
          },
        });
        const updated = await tx.listing.findUnique({
          where: { id: listing.id },
          select: { stock: true },
        });
        console.log('Updated stock:', updated?.stock);
        updatedListings += 1;
      }

      await tx.cartItem.deleteMany({
        where: {
          cart: {
            userId,
          },
        },
      });
    });

    return {
      message: 'Product purchase completed',
      updatedListings,
    };
  }
}
