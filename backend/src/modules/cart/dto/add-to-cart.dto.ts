import { IsInt, IsOptional, Min } from 'class-validator';

export class AddToCartDto {

  @IsOptional()
  @IsInt()
  listingId?: number;

  @IsOptional()
  @IsInt()
  bookingId?: number;

  @IsInt()
  @Min(1)
  quantity: number;

}