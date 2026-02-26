import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { VendorManagementService } from './vendor-management.service';
import { CreateListingDto } from './dto/create-listing.dto';
import { UpdateListingDto } from './dto/update-listing.dto';

@Controller('vendor')
export class VendorManagementController {
  constructor(private readonly vendorService: VendorManagementService) {}

  /**
   * Get all active categories (fixed list)
   * GET /vendor/categories
   */
  @Get('categories')
  async getCategories() {
    return this.vendorService.getAvailableCategories();
  }

  /**
   * Get all listing types (fixed enum)
   * GET /vendor/listing-types
   */
  @Get('listing-types')
  getListingTypes() {
    return this.vendorService.getAvailableListingTypes();
  }

  /**
   * Get vendor's locations (fixed list per vendor)
   * GET /vendor/:vendorId/locations
   */
  @Get(':vendorId/locations')
  async getLocations(@Param('vendorId', ParseIntPipe) vendorId: number) {
    return this.vendorService.getVendorLocations(vendorId);
  }

  /**
   * Get all listings for a vendor
   * GET /vendor/:vendorId/listings
   */
  @Get(':vendorId/listings')
  async getListings(@Param('vendorId', ParseIntPipe) vendorId: number) {
    return this.vendorService.getVendorListings(vendorId);
  }

  /**
   * Create a new listing
   * POST /vendor/:vendorId/listings
   */
  @Post(':vendorId/listings')
  @HttpCode(HttpStatus.CREATED)
  async createListing(
    @Param('vendorId', ParseIntPipe) vendorId: number,
    @Body() createListingDto: CreateListingDto,
  ) {
    return this.vendorService.createListing(vendorId, createListingDto);
  }

  /**
   * Update an existing listing
   * PUT /vendor/:vendorId/listings/:listingId
   */
  @Put(':vendorId/listings/:listingId')
  async updateListing(
    @Param('vendorId', ParseIntPipe) vendorId: number,
    @Param('listingId', ParseIntPipe) listingId: number,
    @Body() updateListingDto: UpdateListingDto,
  ) {
    return this.vendorService.updateListing(
      vendorId,
      listingId,
      updateListingDto,
    );
  }

  /**
   * Delete a listing
   * DELETE /vendor/:vendorId/listings/:listingId
   */
  @Delete(':vendorId/listings/:listingId')
  @HttpCode(HttpStatus.OK)
  async deleteListing(
    @Param('vendorId', ParseIntPipe) vendorId: number,
    @Param('listingId', ParseIntPipe) listingId: number,
  ) {
    return this.vendorService.deleteListing(vendorId, listingId);
  }
}
