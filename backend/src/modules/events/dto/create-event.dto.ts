import { IsString, IsDateString, IsOptional, IsEnum } from 'class-validator';
import { EventStatus } from '@prisma/client';

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
  endDate?: Date;

  @IsString()
  location: string;

  @IsString()
  city: string;

  @IsString()
  district: string;

  @IsString()
  province: string;

  @IsOptional()
  @IsEnum(EventStatus)
  status?: EventStatus;
}
