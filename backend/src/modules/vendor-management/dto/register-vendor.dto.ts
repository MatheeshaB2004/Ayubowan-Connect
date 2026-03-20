import { IsString, IsEmail, IsOptional, IsNumber, ValidateNested, IsObject } from 'class-validator';
import { Type } from 'class-transformer';

export class VendorLocationDto {
  @IsString()
  addressLine1: string;

  @IsOptional()
  @IsString()
  addressLine2?: string;

  @IsString()
  city: string;

  @IsString()
  district: string;

  @IsString()
  province: string;

  @IsOptional()
  @IsString()
  postalCode?: string;
}

export class RegisterVendorDto {
  @IsEmail()
  email: string;

  @IsString()
  fullName: string;

  @IsString()
  businessName: string;

  @IsOptional()
  @IsString()
  shortTagline?: string;

  @IsOptional()
  @IsString()
  contactPhone?: string;

  @IsOptional()
  @IsNumber()
  establishedYear?: number;

  @IsObject()
  @ValidateNested()
  @Type(() => VendorLocationDto)
  location: VendorLocationDto;
}
