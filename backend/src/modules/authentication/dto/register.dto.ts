import { IsString, IsEmail, IsOptional, IsEnum } from 'class-validator';

export class RegisterDto {
  @IsString()
  fullName: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsEnum(['LOCAL', 'TOURIST'])
  userType: 'LOCAL' | 'TOURIST';

  @IsOptional()
  @IsString()
  nationality?: string;

  @IsOptional()
  @IsString()
  dateOfBirth?: string;

  @IsOptional()
  @IsString()
  preferredLanguage?: string;
}