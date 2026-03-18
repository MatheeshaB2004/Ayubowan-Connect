import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterTouristDto } from './dto/register-tourist.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async registerTourist(@Body() dto: RegisterTouristDto) {
    return this.userService.registerTourist(dto);
  }
}
