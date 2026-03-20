import { IsString, IsEmail, IsOptional, IsEnum, IsDateString } from 'class-validator';
import { LocalUserType } from '@prisma/client';

export class RegisterTouristDto {
  @IsEmail()
  email: string;

  @IsString()
  fullName: string;

  @IsOptional()
  @IsString()
  profilePhotoUrl?: string;

  @IsEnum(LocalUserType)
  userType: LocalUserType;

  @IsString()
  nationality: string;

  @IsOptional()
  @IsDateString()
  dateOfBirth?: string;

  @IsOptional()
  @IsString()
  preferredLanguage?: string;
}
