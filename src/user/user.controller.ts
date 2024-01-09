import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { createAddressDto } from './dtos/user.dtos';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtGuard)
  @Post('address')
  async createAddress(@Body() body: createAddressDto) {
    return await this.userService.createAddress(body);
  }
}
