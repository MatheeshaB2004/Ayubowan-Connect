import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  Query,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ListingType } from '@prisma/client';
import { MarketplaceService } from './marketplace.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { CloudinaryService } from '../../cloudinary/cloudinary.service';

@Controller('marketplace')
export class MarketplaceController {
  constructor(
    private readonly marketplaceService: MarketplaceService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Get()
  findAll(
    @Query('type') type?: string,
    @Query('search') search?: string,
    @Query('category') category?: string | string[],
    @Query('location') location?: string,
    @Query('minPrice') minPrice?: string,
    @Query('maxPrice') maxPrice?: string,
    @Query('priceRange') priceRange?: string,
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
  ) {
    return this.marketplaceService.findAll({
      type: toListingType(type),
      search: normalize(search),
      categories: toStringArray(category),
      location: normalize(location),
      minPrice: toNumber(minPrice),
      maxPrice: toNumber(maxPrice),
      priceRange: normalize(priceRange),
      limit: toNumber(limit),
      offset: toNumber(offset),
    });
  }

  @Get('filters')
  getFilters() {
    return this.marketplaceService.getFilters();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.marketplaceService.findOne(id);
  }

  @Get(':id/reviews')
  getReviews(
    @Param('id', ParseIntPipe) id: number,
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
  ) {
    return this.marketplaceService.getReviewsByListing(
      id,
      toNumber(limit),
      toNumber(offset),
    );
  }

  @Post('reviews')
  createReview(@Body() createReviewDto: CreateReviewDto) {
    return this.marketplaceService.createReview(createReviewDto);
  }

  @Post('upload-review-media')
  @UseInterceptors(FilesInterceptor('files', 5))
  async uploadReviewMedia(@UploadedFiles() files: Express.Multer.File[]) {
    if (!files || files.length === 0) {
      return { urls: [] };
    }

    // Validate file types
    const allowedMimes = [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp',
      'video/mp4',
      'video/webm',
      'video/quicktime',
    ];
    for (const file of files) {
      if (!allowedMimes.includes(file.mimetype)) {
        throw new Error(
          'Invalid file type. Only images and videos are allowed.',
        );
      }
    }

    // Upload to Cloudinary
    const urls = await this.cloudinaryService.uploadMultipleFiles(
      files,
      'ayubowan-connect/reviews',
    );

    return { urls };
  }
}

function toListingType(value?: string): ListingType | undefined {
  if (!value) return undefined;
  const normalized = value.toUpperCase();
  if (normalized === 'EXPERIENCE') return ListingType.EXPERIENCE;
  if (normalized === 'PRODUCT') return ListingType.PRODUCT;
  return undefined;
}

function toStringArray(value?: string | string[]) {
  if (!value) return undefined;
  const items = Array.isArray(value) ? value : value.split(',');
  const cleaned = items.map((item) => item.trim()).filter(Boolean);
  return cleaned.length ? cleaned : undefined;
}

function toNumber(value?: string) {
  if (!value) return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

function normalize(value?: string) {
  if (!value) return undefined;
  const trimmed = value.trim();
  return trimmed.length ? trimmed : undefined;
}
