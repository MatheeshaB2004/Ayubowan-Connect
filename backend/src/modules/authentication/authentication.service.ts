import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ConfigService } from '@nestjs/config';

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
    await this.prisma.refreshToken.deleteMany({
      where: { userId: userId },
    });
    return { message: 'Logged out successfully' };
  }

  async refreshTokens(userId: number, rt: string) {
    const tokenRecord = await this.prisma.refreshToken.findUnique({
      where: { token: rt },
    });

    if (!tokenRecord || tokenRecord.userId !== userId || tokenRecord.revoked)
      throw new ForbiddenException('Access Denied');

    if (tokenRecord.expiresAt < new Date()) {
      await this.prisma.refreshToken.delete({ where: { id: tokenRecord.id } });
      throw new ForbiddenException('Token Expired');
    }

    await this.prisma.refreshToken.delete({ where: { id: tokenRecord.id } });

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

    await this.prisma.refreshToken.create({
      data: {
        token: rt,
        userId: userId,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    return {
      access_token: at,
      refresh_token: rt,
    };
  }
}
