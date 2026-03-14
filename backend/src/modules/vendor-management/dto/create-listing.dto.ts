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
import { VisibilityStatus } from "@prisma/client";
import { Type, Transform } from 'class-transformer';
import { ListingType } from '@prisma/client';

export class CreateListingDto {
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  categoryId: number;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  addressId: number;

  @IsEnum(ListingType)
  @IsNotEmpty()
  listingType: ListingType;

  @IsOptional()
  @IsEnum(VisibilityStatus)
  visibilityStatus?: VisibilityStatus;

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

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  priceMin: number;

  @Type(() => Number)
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

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  capacity?: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  stock?: number;

  @IsString()
  @IsOptional()
  availability?: string;

  @Transform(({ value }) => {
    if (typeof value === 'string') {
      try {
        return JSON.parse(value);
      } catch {
        return [];
      }
    }
    return value;
  })
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

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  displayPriority?: number;

}
