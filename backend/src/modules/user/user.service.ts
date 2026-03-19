import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { RegisterTouristDto } from './dto/register-tourist.dto';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async registerTourist(dto: RegisterTouristDto) {
    try {
      // 1. Check if a base User exists with this email (e.g., from Clerk OAuth)
      let user = await this.prisma.user.findUnique({
        where: { email: dto.email },
      });

      // 2. If it doesn't exist, create it with a random password since Clerk handles auth
      if (!user) {
        const randomPassword = crypto.randomBytes(32).toString('hex');
        const hash = await bcrypt.hash(randomPassword, 10);

        user = await this.prisma.user.create({
          data: {
            fullName: dto.fullName,
            email: dto.email,
            passwordHash: hash,
            role: 'USER',
            isActive: true,
          },
        });
      }

      // 3. Upsert the LocalTourist profile connected to this User
      const localTourist = await this.prisma.localTourist.upsert({
        where: { userId: user.id },
        update: {
          fullName: dto.fullName,
          profilePhotoUrl: dto.profilePhotoUrl,
          userType: dto.userType,
          nationality: dto.nationality,
          dateOfBirth: dto.dateOfBirth ? new Date(dto.dateOfBirth) : null,
          preferredLanguage: dto.preferredLanguage,
        },
        create: {
          userId: user.id,
          fullName: dto.fullName,
          profilePhotoUrl: dto.profilePhotoUrl,
          userType: dto.userType,
          nationality: dto.nationality,
          dateOfBirth: dto.dateOfBirth ? new Date(dto.dateOfBirth) : null,
          preferredLanguage: dto.preferredLanguage || 'English',
        },
      });

      return {
        message: 'Tourist profile registered successfully',
        data: localTourist,
      };
    } catch (error) {
      throw new InternalServerErrorException('Failed to register tourist profile');
    }
  }
}
