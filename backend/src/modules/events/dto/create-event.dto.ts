import {
  IsString,
  IsOptional,
  IsBoolean,
  IsNumber,
  IsDateString,
} from 'class-validator';

export class CreateEventDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsDateString()
  startDate: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;

  @IsOptional()
  @IsString()
  time?: string;

  @IsString()
  location: string;

  @IsString()
  city: string;

  @IsString()
  district: string;

  @IsString()
  province: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsOptional()
  @IsBoolean()
  isFree?: boolean;

  @IsOptional()
  @IsNumber()
  maxParticipants?: number;
}
