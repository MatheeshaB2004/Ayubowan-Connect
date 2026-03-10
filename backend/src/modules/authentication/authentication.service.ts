import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';

@Injectable()
export class AuthenticationService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async register(dto: RegisterDto) {
    // Check if user exists
    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (existingUser) {
      throw new ForbiddenException('Email already in use');
    }

    const hash = await bcrypt.hash(dto.password, 10);

    const user = await this.prisma.user.create({
      data: {
        fullName: dto.fullName,
        email: dto.email,
        passwordHash: hash,
        role: 'USER',
      },
    });

    return this.signTokens(user.id, user.email, user.role);
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) throw new ForbiddenException('Credentials incorrect');

    const pwMatches = await bcrypt.compare(dto.password, user.passwordHash);
    if (!pwMatches) throw new ForbiddenException('Credentials incorrect');

    return this.signTokens(user.id, user.email, user.role);
  }

  async logout(userId: number) {
    // RefreshToken model was removed from DB schema
    return { message: 'Logged out successfully' };
  }

  async refreshTokens(userId: number, rt: string) {
    try {
      this.jwt.verify(rt, { secret: this.config.get<string>('JWT_SECRET') || 'secret' });
    } catch {
      throw new ForbiddenException('Token Expired or Invalid');
    }

    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new ForbiddenException('User not found');

    return this.signTokens(user.id, user.email, user.role);
  }

  private async signTokens(userId: number, email: string, role: string) {
    const payload = { sub: userId, email, role };
    const secret = this.config.get<string>('JWT_SECRET') || 'secret';

    const [at, rt] = await Promise.all([
      this.jwt.signAsync(payload, {
        expiresIn: '15m',
        secret: secret,
      }),
      this.jwt.signAsync(payload, {
        expiresIn: '7d',
        secret: secret,
      }),
    ]);

    // RefreshToken persistence was removed from schema

    return {
      access_token: at,
      refresh_token: rt,
    };
  }

  getGoogleAuthUrl(): string {
    const clientId = this.config.get<string>('GOOGLE_CLIENT_ID');
    const redirectUri =
      this.config.get<string>('GOOGLE_REDIRECT_URI') ||
      'http://localhost:3000/auth/google/callback';
    const scope = 'email profile';

    if (!clientId) {
      throw new Error('GOOGLE_CLIENT_ID is not configured');
    }

    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      response_type: 'code',
      scope: scope,
      access_type: 'offline',
      prompt: 'consent',
    });

    return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
  }

  async googleLogin(code: string) {
    const clientId = this.config.get<string>('GOOGLE_CLIENT_ID');
    const clientSecret = this.config.get<string>('GOOGLE_CLIENT_SECRET');
    const redirectUri =
      this.config.get<string>('GOOGLE_REDIRECT_URI') ||
      'http://localhost:3000/auth/google/callback';

    if (!clientId || !clientSecret) {
      throw new ForbiddenException('Google OAuth is not configured');
    }

    // Exchange code for tokens
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
      }),
    });

    if (!tokenResponse.ok) {
      throw new ForbiddenException('Failed to exchange authorization code');
    }

    const tokens = await tokenResponse.json();

    // Get user info from Google
    const userInfoResponse = await fetch(
      'https://www.googleapis.com/oauth2/v2/userinfo',
      {
        headers: {
          Authorization: `Bearer ${tokens.access_token}`,
        },
      },
    );

    if (!userInfoResponse.ok) {
      throw new ForbiddenException('Failed to get user info from Google');
    }

    const userInfo = await userInfoResponse.json();

    // Check if user exists
    let user = await this.prisma.user.findUnique({
      where: { email: userInfo.email },
    });

    if (!user) {
      // Create new user
      const randomPassword = crypto.randomBytes(32).toString('hex');
      const hash = await bcrypt.hash(randomPassword, 10);

      user = await this.prisma.user.create({
        data: {
          fullName: userInfo.name || userInfo.email,
          email: userInfo.email,
          passwordHash: hash,
          role: 'USER',
        },
      });
    }

    return this.signTokens(user.id, user.email, user.role);
  }
}
