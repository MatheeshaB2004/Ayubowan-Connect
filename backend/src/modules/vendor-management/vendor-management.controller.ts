import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Req,
  Param,
  Query,
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

   /*Get vendor profile by Clerk userId */
  @Get('profile')
  async getVendorProfile(@Query('userId') userId: string) {
    return this.vendorService.getVendorProfileByUserId(userId);
  }

  
   /* Update vendor profile by Clerk userId */
  
  @Put('profile')
  async updateVendorProfile(@Body() body: any) {
    return this.vendorService.updateVendorProfileByUserId(body);
  }


  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async registerVendor(@Body() body: any) {
    return this.vendorService.registerVendorFromClerk(body);
  }
  @Get('categories')
  async getCategories() {
    return this.vendorService.getAvailableCategories();
  }


  @Get('listing-types')
  getListingTypes() {
    return this.vendorService.getAvailableListingTypes();
  }

  
  @Get(':vendorId/locations')
  async getLocations(@Param('vendorId', ParseIntPipe) vendorId: number) {
    return this.vendorService.getVendorLocations(vendorId);
  }

  
   /* Get all listings for a vendor*/
  @Get(':vendorId/listings')
  async getListings(@Param('vendorId', ParseIntPipe) vendorId: number) {
    return this.vendorService.getVendorListings(vendorId);
  }

  
  /* Create a new listing
   */
  @Post(':vendorId/listings')
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FileInterceptor('image'))
  async createListing(
    @Param('vendorId', ParseIntPipe) vendorId: number,
    @Body() createListingDto: CreateListingDto,
    @UploadedFile() file: Express.Multer.File,
  ) {

    return this.vendorService.createListing(vendorId, createListingDto, file);
  }

  /* Update an existing listing*/
  @Put(':vendorId/listings/:listingId')
  @UseInterceptors(FileInterceptor('image'))
  async updateListing(
    @Param('vendorId', ParseIntPipe) vendorId: number,
    @Param('listingId', ParseIntPipe) listingId: number,
    @Body() updateListingDto: UpdateListingDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {

    return this.vendorService.updateListing(
      vendorId,
      listingId,
      updateListingDto,
      file,
    );
  }

  /* Delete a listing */
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
    const userId = req.user?.id; 


    if (!userId) {
      throw new UnauthorizedException("Login required");
    }

    return this.vendorService.recordProfileView(
      Number(id),
      userId
    );
  }
}
