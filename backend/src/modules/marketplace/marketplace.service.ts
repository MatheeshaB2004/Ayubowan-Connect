import { Injectable, NotFoundException } from '@nestjs/common';
import { ListingType, Prisma, UserRole } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateReviewDto } from './dto/create-review.dto';
import {
  ReviewResponseDto,
  ReviewsListResponseDto,
} from './dto/review-response.dto';

type MarketplaceQuery = {
  type?: ListingType;
  search?: string;
  categories?: string[];
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  priceRange?: string;
  limit?: number;
  offset?: number;
};

type ListingSummary = {
  id: number;
  title: string;
  price: number;
  location: string;
  district: string;
  rating: number;
  imageUrl: string | null;
  category: string;
  type: 'experience' | 'product';
  shortDescription: string;
};

@Injectable()
export class MarketplaceService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: MarketplaceQuery) {
    const {
      type,
      search,
      categories,
      location,
      minPrice,
      maxPrice,
      priceRange,
      limit = 24,
      offset = 0,
    } = query;

    const priceBounds = this.resolvePriceBounds(minPrice, maxPrice, priceRange);

    const where: Prisma.ListingWhereInput = {
      ...(type ? { listingType: type } : {}),
      ...(categories?.length
        ? { category: { categoryName: { in: categories } } }
        : {}),
      ...(location ? { location: { district: location } } : {}),
      ...(priceBounds
        ? {
            priceMin: {
              gte: priceBounds.min,
              lte: priceBounds.max,
            },
          }
        : {}),
      ...(search
        ? {
            OR: [
              { title: { contains: search, mode: 'insensitive' } },
              { shortDescription: { contains: search, mode: 'insensitive' } },
              { longDescription: { contains: search, mode: 'insensitive' } },
            ],
          }
        : {}),
    };

    const [total, listings] = await this.prisma.$transaction([
      this.prisma.listing.count({ where }),
      this.prisma.listing.findMany({
        where,
        include: {
          category: true,
          location: true,
          media: true,
        },
        orderBy: [{ displayPriority: 'desc' }, { createdAt: 'desc' }],
        skip: offset,
        take: limit,
      }),
    ]);

    return {
      total,
      items: listings.map((listing) => this.toSummary(listing)),
    };
  }

  async findOne(id: number) {
    const listing = await this.prisma.listing.findUnique({
      where: { id },
      include: {
        category: true,
        location: {
          select: {
            city: true,
            district: true,
            province: true,
            latitude: true,
            longitude: true,
          },
        },
        media: true,
        vendor: {
          include: {
            user: {
              select: {
                email: true,
              },
            },
          },
        },
      },
    });

    if (!listing) {
      throw new NotFoundException(`Listing with ID ${id} not found`);
    }

    // Transform to include contactEmail in vendor
    const result = {
      ...listing,
      vendor: listing.vendor
        ? {
            ...listing.vendor,
            contactEmail: listing.vendor.user.email,
            contactPhone: '+94 77 123 4567', // Placeholder - add phone field to schema later
          }
        : null,
    };

    return result;
  }

  async getFilters() {
    const [categories, locations] = await this.prisma.$transaction([
      this.prisma.listingCategory.findMany({
        where: { isActive: true },
        orderBy: { categoryName: 'asc' },
      }),
      this.prisma.vendorLocation.findMany({
        select: { district: true, province: true },
        distinct: ['district'],
        orderBy: { district: 'asc' },
      }),
    ]);

    // Sri Lanka provinces with their districts
    const provinceDistrictMap = {
      Western: ['Colombo', 'Gampaha', 'Kalutara'],
      Central: ['Kandy', 'Matale', 'Nuwara Eliya'],
      Southern: ['Galle', 'Matara', 'Hambantota'],
      Northern: ['Jaffna', 'Kilinochchi', 'Mannar', 'Mullaitivu', 'Vavuniya'],
      Eastern: ['Ampara', 'Batticaloa', 'Trincomalee'],
      'North Western': ['Kurunegala', 'Puttalam'],
      'North Central': ['Anuradhapura', 'Polonnaruwa'],
      Uva: ['Badulla', 'Monaragala'],
      Sabaragamuwa: ['Ratnapura', 'Kegalle'],
    };

    // All 25 districts of Sri Lanka
    const allDistricts = [
      'Ampara',
      'Anuradhapura',
      'Badulla',
      'Batticaloa',
      'Colombo',
      'Galle',
      'Gampaha',
      'Hambantota',
      'Jaffna',
      'Kalutara',
      'Kandy',
      'Kegalle',
      'Kilinochchi',
      'Kurunegala',
      'Mannar',
      'Matale',
      'Matara',
      'Monaragala',
      'Mullaitivu',
      'Nuwara Eliya',
      'Polonnaruwa',
      'Puttalam',
      'Ratnapura',
      'Trincomalee',
      'Vavuniya',
    ];

    // Get unique districts from database
    const dbDistricts = [...new Set(locations.map((loc) => loc.district))];

    // Combine all districts (database + full list)
    const combinedDistricts = [
      ...new Set([...dbDistricts, ...allDistricts]),
    ].sort();

    return {
      categories: categories.map((category) => category.categoryName),
      locations: combinedDistricts,
      provinceDistrictMap: provinceDistrictMap,
    };
  }

  private toSummary(listing: {
    id: number;
    title: string;
    shortDescription: string;
    priceMin: number;
    ratingAverage: number;
    listingType: ListingType;
    category: { categoryName: string };
    location: { city: string; district: string };
    media: Array<{ mediaUrl: string; isPrimary: boolean }>;
  }): ListingSummary {
    const primaryMedia =
      listing.media.find((media) => media.isPrimary) ?? listing.media[0];

    return {
      id: listing.id,
      title: listing.title,
      price: listing.priceMin,
      location: listing.location.city,
      district: listing.location.district,
      rating: listing.ratingAverage,
      imageUrl: primaryMedia?.mediaUrl ?? null,
      category: listing.category.categoryName,
      type:
        listing.listingType === ListingType.PRODUCT ? 'product' : 'experience',
      shortDescription: listing.shortDescription,
    };
  }

  private resolvePriceBounds(
    minPrice?: number,
    maxPrice?: number,
    priceRange?: string,
  ) {
    if (typeof minPrice === 'number' || typeof maxPrice === 'number') {
      return {
        min: typeof minPrice === 'number' ? minPrice : 0,
        max: typeof maxPrice === 'number' ? maxPrice : Number.MAX_SAFE_INTEGER,
      };
    }

    if (!priceRange) {
      return null;
    }

    switch (priceRange) {
      case 'under-2000':
        return { min: 0, max: 1999 };
      case '2000-5000':
        return { min: 2000, max: 5000 };
      case '5000-plus':
        return { min: 5001, max: Number.MAX_SAFE_INTEGER };
      default:
        return null;
    }
  }

  // Review methods
  async getReviewsByListing(
    listingId: number,
    limit = 20,
    offset = 0,
  ): Promise<ReviewsListResponseDto> {
    const [reviews, total, listing] = await this.prisma.$transaction([
      this.prisma.review.findMany({
        where: { listingId },
        include: {
          user: {
            select: {
              fullName: true,
            },
          },
          media: {
            orderBy: { displayOrder: 'asc' },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip: offset,
        take: limit,
      }),
      this.prisma.review.count({ where: { listingId } }),
      this.prisma.listing.findUnique({
        where: { id: listingId },
        select: { ratingAverage: true },
      }),
    ]);

    return {
      total,
      averageRating: listing?.ratingAverage || 0,
      reviews: reviews.map((review) => ({
        id: review.id,
        listingId: review.listingId,
        userId: review.userId,
        userName: review.user.fullName,
        rating: review.rating,
        comment: review.comment,
        media: review.media.map((m) => ({
          id: m.id,
          mediaType: m.mediaType,
          mediaUrl: m.mediaUrl,
          displayOrder: m.displayOrder,
        })),
        createdAt: review.createdAt,
        updatedAt: review.updatedAt,
      })),
    };
  }

  async createReview(
    createReviewDto: CreateReviewDto,
  ): Promise<ReviewResponseDto> {
    // Resolve user by email sent from the frontend (logged-in Clerk user).
    // Upsert so the stored fullName stays in sync with Clerk profile changes.
    let resolvedUserId = 1; // fallback for unauthenticated requests
    if (createReviewDto.userEmail) {
      const displayName =
        createReviewDto.userName?.trim() ||
        createReviewDto.userEmail.split('@')[0];
      const user = await this.prisma.user.upsert({
        where: { email: createReviewDto.userEmail },
        create: {
          fullName: displayName,
          email: createReviewDto.userEmail,
          passwordHash: 'clerk-managed',
          role: UserRole.USER,
        },
        update: {
          fullName: displayName,
        },
      });
      resolvedUserId = user.id;
    }

    // Check if listing exists
    const listing = await this.prisma.listing.findUnique({
      where: { id: createReviewDto.listingId },
    });

    if (!listing) {
      throw new NotFoundException(
        `Listing with ID ${createReviewDto.listingId} not found`,
      );
    }

    // Validate media count (max 5)
    if (createReviewDto.mediaUrls && createReviewDto.mediaUrls.length > 5) {
      throw new Error('Maximum 5 photos/videos allowed per review');
    }

    // Create the review with media in a transaction
    const review = await this.prisma.$transaction(async (tx) => {
      const newReview = await tx.review.create({
        data: {
          listingId: createReviewDto.listingId,
          userId: resolvedUserId,
          rating: createReviewDto.rating,
          comment: createReviewDto.comment,
        },
        include: {
          user: {
            select: {
              fullName: true,
            },
          },
        },
      });

      // Create review media if provided
      if (createReviewDto.mediaUrls && createReviewDto.mediaUrls.length > 0) {
        await tx.reviewMedia.createMany({
          data: createReviewDto.mediaUrls.map((url, index) => ({
            reviewId: newReview.id,
            mediaType: url.match(/\.(mp4|webm|ogg|mov)$/i) ? 'VIDEO' : 'IMAGE',
            mediaUrl: url,
            displayOrder: index,
          })),
        });
      }

      return newReview;
    });

    // Update listing rating average
    await this.updateListingRating(createReviewDto.listingId);

    // Fetch the complete review with media
    const completeReview = await this.prisma.review.findUnique({
      where: { id: review.id },
      include: {
        user: {
          select: {
            fullName: true,
          },
        },
        media: {
          orderBy: { displayOrder: 'asc' },
        },
      },
    });

    if (!completeReview) {
      throw new Error('Failed to retrieve created review');
    }

    return {
      id: completeReview.id,
      listingId: completeReview.listingId,
      userId: completeReview.userId,
      userName: completeReview.user.fullName,
      rating: completeReview.rating,
      comment: completeReview.comment,
      media: completeReview.media.map((m) => ({
        id: m.id,
        mediaType: m.mediaType,
        mediaUrl: m.mediaUrl,
        displayOrder: m.displayOrder,
      })),
      createdAt: completeReview.createdAt,
      updatedAt: completeReview.updatedAt,
    };
  }

  async getUserReviewForListing(
    listingId: number,
    userEmail: string,
  ): Promise<ReviewResponseDto | null> {
    const user = await this.prisma.user.findUnique({
      where: { email: userEmail },
    });
    if (!user) return null;

    const review = await this.prisma.review.findUnique({
      where: { userId_listingId: { userId: user.id, listingId } },
      include: {
        user: { select: { fullName: true } },
        media: { orderBy: { displayOrder: 'asc' } },
      },
    });
    if (!review) return null;

    return {
      id: review.id,
      listingId: review.listingId,
      userId: review.userId,
      userName: review.user.fullName,
      rating: review.rating,
      comment: review.comment,
      media: review.media.map((m) => ({
        id: m.id,
        mediaType: m.mediaType,
        mediaUrl: m.mediaUrl,
        displayOrder: m.displayOrder,
      })),
      createdAt: review.createdAt,
      updatedAt: review.updatedAt,
    };
  }

  async updateReview(
    reviewId: number,
    userEmail: string,
    rating: number,
    comment: string,
    mediaUrls?: string[],
  ): Promise<ReviewResponseDto> {
    const user = await this.prisma.user.findUnique({
      where: { email: userEmail },
    });
    if (!user) throw new NotFoundException('User not found');

    const existing = await this.prisma.review.findUnique({
      where: { id: reviewId },
    });
    if (!existing) throw new NotFoundException('Review not found');
    if (existing.userId !== user.id)
      throw new NotFoundException('Review not found');

    await this.prisma.$transaction(async (tx) => {
      await tx.review.update({
        where: { id: reviewId },
        data: { rating, comment },
      });

      if (mediaUrls !== undefined) {
        await tx.reviewMedia.deleteMany({ where: { reviewId } });
        if (mediaUrls.length > 0) {
          await tx.reviewMedia.createMany({
            data: mediaUrls.map((url, index) => ({
              reviewId,
              mediaType: url.match(/\.(mp4|webm|ogg|mov)$/i) ? 'VIDEO' : 'IMAGE',
              mediaUrl: url,
              displayOrder: index,
            })),
          });
        }
      }
    });

    await this.updateListingRating(existing.listingId);

    const updated = await this.prisma.review.findUnique({
      where: { id: reviewId },
      include: {
        user: { select: { fullName: true } },
        media: { orderBy: { displayOrder: 'asc' } },
      },
    });

    return {
      id: updated!.id,
      listingId: updated!.listingId,
      userId: updated!.userId,
      userName: updated!.user.fullName,
      rating: updated!.rating,
      comment: updated!.comment,
      media: updated!.media.map((m) => ({
        id: m.id,
        mediaType: m.mediaType,
        mediaUrl: m.mediaUrl,
        displayOrder: m.displayOrder,
      })),
      createdAt: updated!.createdAt,
      updatedAt: updated!.updatedAt,
    };
  }

  async deleteReview(reviewId: number, userEmail: string): Promise<void> {
    const user = await this.prisma.user.findUnique({
      where: { email: userEmail },
    });
    if (!user) throw new NotFoundException('User not found');

    const existing = await this.prisma.review.findUnique({
      where: { id: reviewId },
    });
    if (!existing) throw new NotFoundException('Review not found');
    if (existing.userId !== user.id)
      throw new NotFoundException('Review not found');

    await this.prisma.review.delete({ where: { id: reviewId } });
    await this.updateListingRating(existing.listingId);
  }

  private async updateListingRating(listingId: number): Promise<void> {
    const aggregation = await this.prisma.review.aggregate({
      where: { listingId },
      _avg: { rating: true },
      _count: { rating: true },
    });

    const ratingAverage = aggregation._avg.rating || 0;
    const ratingCount = aggregation._count.rating || 0;

    await this.prisma.listing.update({
      where: { id: listingId },
      data: {
        ratingAverage,
        ratingCount,
      },
    });
  }
}
