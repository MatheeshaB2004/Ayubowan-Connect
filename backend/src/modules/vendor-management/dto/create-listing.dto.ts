import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsEnum,
  IsOptional,
  IsArray,
  IsBoolean,
  Min,
  MaxLength,
} from 'class-validator';
import { ListingType } from '@prisma/client';

export class CreateListingDto {
  @IsNumber()
  @IsNotEmpty()
  categoryId: number;

  @IsNumber()
  @IsNotEmpty()
  addressId: number;

  @IsEnum(ListingType)
  @IsNotEmpty()
  listingType: ListingType;

  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  title: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  shortDescription: string;

  @IsString()
  @IsOptional()
  longDescription?: string;

  @IsNumber()
  @Min(0)
  priceMin: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  priceMax?: number;

  @IsString()
  @IsOptional()
  priceNote?: string;

  @IsString()
  @IsOptional()
  duration?: string;

  @IsNumber()
  @IsOptional()
  capacity?: number;

  @IsString()
  @IsOptional()
  availability?: string;

  @IsArray()
  @IsOptional()
  tags?: string[];

  @IsOptional()
  inclusions?: any;

  @IsOptional()
  specs?: any;

  @IsBoolean()
  @IsOptional()
  isFeatured?: boolean;

  @IsNumber()
  @IsOptional()
  displayPriority?: number;
}
