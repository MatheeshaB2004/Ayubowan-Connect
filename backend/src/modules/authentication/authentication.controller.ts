import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import type { Response } from 'express';
import { AuthenticationService } from './authentication.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthenticationController {
  constructor(private authService: AuthenticationService) {}

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('logout')
  logout(@Body('userId') userId: number) {
    // Note: In a real app, you'd extract userId from the JWT via a Guard
    return this.authService.logout(userId);
  }

  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  refreshTokens(
    @Body('userId') userId: number,
    @Body('refreshToken') refreshToken: string,
  ) {
    // Note: In a real app, use a Guard to extract this info
    return this.authService.refreshTokens(userId, refreshToken);
  }

  @Get('google')
  googleAuth(@Res() res: Response) {
    const googleAuthUrl = this.authService.getGoogleAuthUrl();
    res.redirect(googleAuthUrl);
  }

  @Get('google/callback')
  async googleAuthCallback(@Query('code') code: string, @Res() res: Response) {
    try {
      const tokens = await this.authService.googleLogin(code);
      // Redirect to frontend with tokens as query parameters
      // In production, consider using httpOnly cookies instead
      res.redirect(
        `http://localhost:3001/auth/callback?access_token=${tokens.access_token}&refresh_token=${tokens.refresh_token}`,
      );
    } catch (error) {
      res.redirect(
        'http://localhost:3001/auth/login?error=authentication_failed',
      );
    }
  }
}
