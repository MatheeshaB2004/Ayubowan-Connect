import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateListingDto } from './dto/create-listing.dto';
import { UpdateListingDto } from './dto/update-listing.dto';

@Injectable()
export class VendorManagementService {
  constructor(private prisma: PrismaService) { }

  /**
   * Get all active categories that vendors can choose from
   */
  async getAvailableCategories() {
    const categories = await this.prisma.listingCategory.findMany({
      where: { isActive: true },
      select: {
        id: true,
        categoryName: true,
      },
      orderBy: { categoryName: 'asc' },
    });
    return categories;
  }

  /**
   * Get all locations for a specific vendor
   */
  async getVendorLocations(vendorId: number) {
    const locations = await this.prisma.vendorLocation.findMany({
      where: { vendorId },
      select: {
        id: true,
        city: true,
        district: true,
        province: true,
        isMainLocation: true,
      },
      orderBy: [{ isMainLocation: 'desc' }, { city: 'asc' }],
    });
    return locations;
  }

  /**
   * Get available listing types (fixed enum)
   */
  getAvailableListingTypes() {
    return [
      { value: 'EXPERIENCE', label: 'Experience' },
      { value: 'PRODUCT', label: 'Product' },
    ];
  }

  /**
   * Create a new listing with validation
   */
  async createListing(vendorId: number, dto: CreateListingDto) {
    // Validate category exists and is active
    const category = await this.prisma.listingCategory.findUnique({
      where: { id: dto.categoryId },
    });

    if (!category) {
      throw new BadRequestException(
        'Invalid category. Please select from available categories.',
      );
    }

    if (!category.isActive) {
      throw new BadRequestException('Selected category is not active.');
    }

    // Validate location belongs to this vendor
    const location = await this.prisma.vendorLocation.findUnique({
      where: { id: dto.addressId },
    });

    if (!location) {
      throw new BadRequestException(
        'Invalid location. Please select from your registered locations.',
      );
    }

    if (location.vendorId !== vendorId) {
      throw new BadRequestException(
        'You can only create listings for your own locations.',
      );
    }

    // Create the listing
    const listing = await this.prisma.listing.create({
      data: {
        vendorId,
        categoryId: dto.categoryId,
        addressId: dto.addressId,
        listingType: dto.listingType,
        title: dto.title,
        shortDescription: dto.shortDescription,
        longDescription: dto.longDescription,
        priceMin: dto.priceMin,
        priceMax: dto.priceMax,
        priceNote: dto.priceNote,
        duration: dto.duration,
        capacity: dto.capacity,
        availability: dto.availability,
        tags: dto.tags || [],
        inclusions: dto.inclusions,
        specs: dto.specs,
        isFeatured: dto.isFeatured || false,
        displayPriority: dto.displayPriority || 0,
      },
      include: {
        category: true,
        location: true,
      },
    });

    // Create search index
    await this.prisma.listingSearchIndex.create({
      data: {
        listingId: listing.id,
        categoryId: listing.categoryId,
        priceMin: listing.priceMin,
        priceMax: listing.priceMax,
        city: location.city,
        district: location.district,
        province: location.province,
      },
    });

    return listing;
  }

  /**
   * Update an existing listing with validation
   */
  async updateListing(
    vendorId: number,
    listingId: number,
    dto: UpdateListingDto,
  ) {
    // Check if listing exists and belongs to vendor
    const existingListing = await this.prisma.listing.findUnique({
      where: { id: listingId },
      include: { location: true },
    });

    if (!existingListing) {
      throw new NotFoundException('Listing not found.');
    }

    if (existingListing.vendorId !== vendorId) {
      throw new BadRequestException('You can only update your own listings.');
    }

    // Validate category if being updated
    if (dto.categoryId) {
      const category = await this.prisma.listingCategory.findUnique({
        where: { id: dto.categoryId },
      });

      if (!category) {
        throw new BadRequestException(
          'Invalid category. Please select from available categories.',
        );
      }

      if (!category.isActive) {
        throw new BadRequestException('Selected category is not active.');
      }
    }

    // Validate location if being updated
    if (dto.addressId) {
      const location = await this.prisma.vendorLocation.findUnique({
        where: { id: dto.addressId },
      });

      if (!location) {
        throw new BadRequestException(
          'Invalid location. Please select from your registered locations.',
        );
      }

      if (location.vendorId !== vendorId) {
        throw new BadRequestException('You can only use your own locations.');
      }
    }

    // Update the listing
    const updatedListing = await this.prisma.listing.update({
      where: { id: listingId },
      data: {
        ...(dto.categoryId && { categoryId: dto.categoryId }),
        ...(dto.addressId && { addressId: dto.addressId }),
        ...(dto.listingType && { listingType: dto.listingType }),
        ...(dto.title && { title: dto.title }),
        ...(dto.shortDescription && { shortDescription: dto.shortDescription }),
        ...(dto.longDescription !== undefined && {
          longDescription: dto.longDescription,
        }),
        ...(dto.priceMin !== undefined && { priceMin: dto.priceMin }),
        ...(dto.priceMax !== undefined && { priceMax: dto.priceMax }),
        ...(dto.priceNote !== undefined && { priceNote: dto.priceNote }),
        ...(dto.duration !== undefined && { duration: dto.duration }),
        ...(dto.capacity !== undefined && { capacity: dto.capacity }),
        ...(dto.availability !== undefined && {
          availability: dto.availability,
        }),
        ...(dto.tags && { tags: dto.tags }),
        ...(dto.inclusions !== undefined && { inclusions: dto.inclusions }),
        ...(dto.specs !== undefined && { specs: dto.specs }),
        ...(dto.isFeatured !== undefined && { isFeatured: dto.isFeatured }),
        ...(dto.displayPriority !== undefined && {
          displayPriority: dto.displayPriority,
        }),
      },
      include: {
        category: true,
        location: true,
      },
    });

    // Update search index if category or location changed
    if (
      dto.categoryId ||
      dto.addressId ||
      dto.priceMin !== undefined ||
      dto.priceMax !== undefined
    ) {
      const location = dto.addressId
        ? await this.prisma.vendorLocation.findUnique({
          where: { id: dto.addressId },
        })
        : existingListing.location;

      await this.prisma.listingSearchIndex.upsert({
        where: { listingId },
        update: {
          ...(dto.categoryId && { categoryId: dto.categoryId }),
          ...(dto.priceMin !== undefined && { priceMin: dto.priceMin }),
          ...(dto.priceMax !== undefined && { priceMax: dto.priceMax }),
          ...(location && {
            city: location.city,
            district: location.district,
            province: location.province,
          }),
        },
        create: {
          listingId,
          categoryId: updatedListing.categoryId,
          priceMin: updatedListing.priceMin,
          priceMax: updatedListing.priceMax,
          city: location!.city,
          district: location!.district,
          province: location!.province,
        },
      });
    }

    return updatedListing;
  }

  /**
   * Get all listings for a vendor
   */
  async getVendorListings(vendorId: number) {
    const listings = await this.prisma.listing.findMany({
      where: { vendorId },
      include: {
        category: true,
        location: true,
        media: true,
      },
      orderBy: [{ displayPriority: 'desc' }, { createdAt: 'desc' }],
    });
    return listings;
  }

  /**
   * Delete a listing
   */
  async deleteListing(vendorId: number, listingId: number) {
    const listing = await this.prisma.listing.findUnique({
      where: { id: listingId },
    });

    if (!listing) {
      throw new NotFoundException('Listing not found.');
    }

    if (listing.vendorId !== vendorId) {
      throw new BadRequestException('You can only delete your own listings.');
    }

    await this.prisma.listing.delete({
      where: { id: listingId },
    });

    return { message: 'Listing deleted successfully' };
  }
}
