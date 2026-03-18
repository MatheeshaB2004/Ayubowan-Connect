import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Req,
  Param,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
  UnauthorizedException
} from '@nestjs/common';
import { Request } from 'express';
import { UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { VendorManagementService } from './vendor-management.service';
import { CreateListingDto } from './dto/create-listing.dto';
import { UpdateListingDto } from './dto/update-listing.dto';
import { RegisterVendorDto } from './dto/register-vendor.dto';

@Controller('vendor')
export class VendorManagementController {
  constructor(private readonly vendorService: VendorManagementService) { }

  /**
   * Register a new Vendor Profile
   * POST /vendor/register
   */
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async registerVendor(@Body() dto: RegisterVendorDto) {
    return this.vendorService.registerVendor(dto);
  }

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
  @UseInterceptors(FileInterceptor('image'))
  async createListing(
    @Param('vendorId', ParseIntPipe) vendorId: number,
    @Body() createListingDto: CreateListingDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log("DTO RECEIVED:", createListingDto);
    return this.vendorService.createListing(vendorId, createListingDto, file);
  }

  /**
   * Update an existing listing
   * PUT /vendor/:vendorId/listings/:listingId
   */
  @Put(':vendorId/listings/:listingId')
  @UseInterceptors(FileInterceptor('image'))
  async updateListing(
    @Param('vendorId', ParseIntPipe) vendorId: number,
    @Param('listingId', ParseIntPipe) listingId: number,
    @Body() updateListingDto: UpdateListingDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {

    console.log("UPDATE DTO RECEIVED:", updateListingDto);
    return this.vendorService.updateListing(
      vendorId,
      listingId,
      updateListingDto,
      file,
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

  @Post(":id/view")
  async recordProfileView(
    @Param("id") id: string,
    @Req() req: any
  ) {
    //const userId = req.user?.id; // After profile is built
    const userId = 4;//Temporary test

    /*if (!userId) {
      throw new UnauthorizedException("Login required");
    }*/

    return this.vendorService.recordProfileView(
      Number(id),
      userId
    );
  }
}
