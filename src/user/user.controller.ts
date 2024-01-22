import {
  Controller,
  Post,
  Body,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Param,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { createAddressDto } from './dtos/user.dtos';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtGuard)
  @Post('address')
  async createAddress(@Body() body: createAddressDto) {
    return await this.userService.createAddress(body);
  }

  @UseGuards(JwtGuard)
  @UseInterceptors(FileInterceptor('file'))
  @Put('user_image/:id')
  async updateUserImage(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: number,
  ) {
    return await this.userService.updateUserImage(id, file);
  }
}
