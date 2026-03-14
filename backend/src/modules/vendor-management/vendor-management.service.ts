import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CloudinaryService } from '../../cloudinary/cloudinary.service';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateListingDto } from './dto/create-listing.dto';
import { UpdateListingDto } from './dto/update-listing.dto';

@Injectable()
export class VendorManagementService {
  constructor(private prisma: PrismaService,
    private cloudinaryService: CloudinaryService
  ) { }

  /**
   * Get vendor profile by Clerk userId
   */
  async getVendorProfileByUserId(clerkUserId: string) {
    const vendor = await this.prisma.vendor.findFirst({
      where: { clerkUserId },
      include: {
        locations: {
          where: { isMainLocation: true },
          take: 1,
        },
      },
    });

    if (!vendor) throw new NotFoundException('Vendor not found');

    const location = vendor.locations[0] || null;

    return {
      businessName: vendor.businessName,
      shortTagline: vendor.shortTagline,
      contactPhone: vendor.contactPhone,
      establishedYear: vendor.establishedYear,
      location: location ? {
        addressLine1: location.addressLine1,
        addressLine2: location.addressLine2,
        city: location.city,
        district: location.district,
        province: location.province,
        postalCode: location.postalCode,
        latitude: location.latitude,
        longitude: location.longitude,
      } : null,
    };
  }

  /**
   * Update vendor profile by Clerk userId
   */
  async updateVendorProfileByUserId(body: any) {
    const { clerkUserId, businessName, shortTagline, contactPhone, establishedYear, location } = body;

    const vendor = await this.prisma.vendor.findUnique({
      where: { clerkUserId },
      include: { locations: { where: { isMainLocation: true }, take: 1 } },
    });

    if (!vendor) throw new NotFoundException('Vendor not found');

    await this.prisma.vendor.update({
      where: { clerkUserId },
      data: {
        ...(businessName && { businessName }),
        ...(shortTagline !== undefined && { shortTagline }),
        ...(contactPhone && { contactPhone }),
        ...(establishedYear && { establishedYear: parseInt(establishedYear) }),
      },
    });

    if (location) {
      const existingLocation = vendor.locations[0];
      if (existingLocation) {
        await this.prisma.vendorLocation.update({
          where: { id: existingLocation.id },
          data: {
            addressLine1: location.addressLine1,
            addressLine2: location.addressLine2 || null,
            city: location.city,
            district: location.district,
            province: location.province,
            postalCode: location.postalCode || null,
            latitude: location.latitude || null,
            longitude: location.longitude || null,
          },
        });
      } else {
        await this.prisma.vendorLocation.create({
          data: {
            vendorId: vendor.id,
            addressLine1: location.addressLine1,
            addressLine2: location.addressLine2 || null,
            city: location.city,
            district: location.district,
            province: location.province,
            postalCode: location.postalCode || null,
            latitude: location.latitude || null,
            longitude: location.longitude || null,
            isMainLocation: true,
          },
        });
      }
    }

    return { message: 'Profile updated successfully' };
  }

  /**
   * Register a vendor via Clerk (creates a Vendor record linked by clerkUserId)
   */
  async registerVendorFromClerk(body: any) {
    const { userId: clerkUserId, businessName, shortTagline, contactPhone, establishedYear, location } = body;

    if (!clerkUserId || !businessName) {
      throw new BadRequestException('userId and businessName are required');
    }

    // Check if vendor already registered
    const existing = await this.prisma.vendor.findUnique({ where: { clerkUserId } });
    if (existing) {
      // Idempotent: if already registered, just return success
      return { message: 'Already registered', vendorId: existing.id };
    }

    // We need a backend User record — create a placeholder one if needed
    // (The Vendor table requires a userId FK to users table)
    // Use clerkUserId as a unique email placeholder so there's no conflict
    let backendUser = await this.prisma.user.findFirst({ where: { email: `clerk_${clerkUserId}@placeholder.local` } });
    if (!backendUser) {
      backendUser = await this.prisma.user.create({
        data: {
          fullName: businessName,
          email: `clerk_${clerkUserId}@placeholder.local`,
          passwordHash: 'clerk-managed',
          role: 'USER',
        },
      });
    }

    const vendor = await this.prisma.vendor.create({
      data: {
        userId: backendUser.id,
        clerkUserId,
        businessName,
        shortTagline: shortTagline || null,
        contactPhone: contactPhone || null,
        establishedYear: establishedYear ? parseInt(establishedYear) : null,
      },
    });

    if (location) {
      await this.prisma.vendorLocation.create({
        data: {
          vendorId: vendor.id,
          addressLine1: location.addressLine1,
          addressLine2: location.addressLine2 || null,
          city: location.city,
          district: location.district,
          province: location.province,
          postalCode: location.postalCode || null,
          latitude: location.latitude || null,
          longitude: location.longitude || null,
          isMainLocation: true,
        },
      });
    }

    return { message: 'Vendor registered successfully', vendorId: vendor.id };
  }


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
  async createListing(vendorId: number, dto: CreateListingDto, file?: Express.Multer.File,) {
    console.time("CREATE_LISTING_TOTAL");
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

    // 1. Create the listing (Wait for this to get the ID)
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
        capacity: null,
        stock:
          dto.listingType === "PRODUCT" && dto.stock
            ? Number(dto.stock)
            : null,
        visibilityStatus: dto.visibilityStatus || "DRAFT",
        availability: dto.availability,
        tags:
          typeof dto.tags === 'string'
            ? JSON.parse(dto.tags)
            : dto.tags || [],

        inclusions:
          typeof dto.inclusions === "string"
            ? JSON.parse(dto.inclusions)
            : dto.inclusions,
        specs: dto.specs,
        isFeatured: dto.isFeatured || false,
        displayPriority: dto.displayPriority || 0,
      },
      include: {
        category: true,
        location: true,
      },
    });

    // Index listing in background
    setImmediate(() => {
      this.prisma.listingSearchIndex.create({
        data: {
          listingId: listing.id,
          categoryId: listing.categoryId,
          priceMin: listing.priceMin,
          priceMax: listing.priceMax,
          city: location.city,
          district: location.district,
          province: location.province,
        },
      }).catch(err => console.error("Background Indexing Error:", err));
    });

    // Handle image upload async
    if (file) {
      const media = await this.prisma.listingMedia.create({
        data: {
          listingId: listing.id,
          mediaUrl: "__UPLOADING__",
          mediaType: "IMAGE",
          isPrimary: true,
        },
      });

      setImmediate(async () => {
        try {
          const upload = await this.cloudinaryService.uploadFile(file);

          await this.prisma.listingMedia.update({
            where: { id: media.id },
            data: {
              mediaUrl: upload.secure_url,
            },
          });
        } catch (e) {
          console.error(e);
        }
      });

    }
    console.timeEnd("CREATE_LISTING_TOTAL");

    return listing;
  }

  /**
   * Update an existing listing with validation
   */
  async updateListing(
    vendorId: number,
    listingId: number,
    dto: UpdateListingDto,
    file?: Express.Multer.File,
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
        ...(dto.visibilityStatus && { visibilityStatus: dto.visibilityStatus }),
        ...(dto.title && { title: dto.title }),
        ...(dto.shortDescription && { shortDescription: dto.shortDescription }),
        ...(dto.longDescription !== undefined && {
          longDescription: dto.longDescription,
        }),
        ...(dto.priceMin !== undefined && { priceMin: dto.priceMin }),
        ...(dto.priceMax !== undefined && { priceMax: dto.priceMax }),
        ...(dto.priceNote !== undefined && { priceNote: dto.priceNote }),
        ...(dto.duration !== undefined && { duration: dto.duration }),
        ...(dto.listingType === "PRODUCT"
          ? { stock: dto.stock ? Number(dto.stock) : null }
          : { stock: null }),
        ...(dto.availability !== undefined && {
          availability: dto.availability,
        }),
        ...(dto.tags !== undefined
          ? {
            tags:
              typeof dto.tags === 'string'
                ? JSON.parse(dto.tags)
                : dto.tags,
          }
          : {}),

        ...(dto.inclusions !== undefined
          ? {
            inclusions:
              typeof dto.inclusions === "string"
                ? JSON.parse(dto.inclusions)
                : dto.inclusions,
          }
          : {}),
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

    if (file) {

      const media = await this.prisma.listingMedia.create({
        data: {
          listingId,
          mediaUrl: "__UPLOADING__",
          mediaType: "IMAGE",
          isPrimary: true,
        },
      });

      await this.prisma.listingMedia.updateMany({
        where: {
          listingId,
          id: { not: media.id },
        },
        data: {
          isPrimary: false,
        },
      });

      setImmediate(async () => {
        try {
          const upload = await this.cloudinaryService.uploadFile(file);

          await this.prisma.listingMedia.update({
            where: { id: media.id },
            data: {
              mediaUrl: upload.secure_url,
            },
          });
        } catch (e) {
          console.error(e);
        }
      });
    }

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
        media: {
          orderBy: { isPrimary: "desc" },
        },

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

  async recordProfileView(vendorId: number, userId: number) {
    try {
      return await this.prisma.profileView.create({
        data: {
          vendorId,
          userId,
        },
      });
    } catch (error) {
      // Unique constraint prevents duplicates
      return null;
    }
  }

  async updateVendorCapacity(vendorId: number, capacity: number) {

    if (!capacity || capacity < 1) {
      throw new BadRequestException("Capacity must be greater than 0");
    }

    // update all availability slots
    await this.prisma.availabilitySlot.updateMany({
      where: {
        availability: {
          vendorId: vendorId,
        },
      },
      data: {
        maxGuests: capacity,
      },
    });

    return { message: "Capacity updated successfully" };
  }

  async getVendorCapacity(vendorId: number) {

    const slot = await this.prisma.availabilitySlot.findFirst({
      where: {
        availability: {
          vendorId: vendorId
        }
      },
      select: {
        maxGuests: true
      }
    });

    return {
      capacity: slot?.maxGuests || null
    };
  }

}
