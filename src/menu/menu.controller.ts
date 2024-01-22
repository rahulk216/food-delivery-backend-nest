import {
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Body,
  Param,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { MenuService } from './menu.service';
import {
  createRestaurantDto,
  updateRestaurantDto,
  createMenuDto,
  updateMenuDto,
} from './dtos/menu.dtos';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  // Menu controllers
  @UseGuards(JwtGuard)
  @UseInterceptors(FileInterceptor('file'))
  @Post('/')
  async createMenu(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: createMenuDto,
  ) {
    return await this.menuService.createMenu(body, file);
  }

  @UseGuards(JwtGuard)
  @Put('/')
  async updateMenu(@Param('id') id: number, @Body() body: updateMenuDto) {
    return await this.menuService.updateMenu(id, body);
  }

  @UseGuards(JwtGuard)
  @Get('/')
  async getAllMenu() {
    return await this.menuService.readMenu();
  }

  @UseGuards(JwtGuard)
  @Get('/')
  async getMenuById(id: number) {
    return await this.menuService.getMenuById(id);
  }

  @UseGuards(JwtGuard)
  @Delete('/')
  async deleteMenu(@Param('id') id: number) {
    return await this.menuService.deleteMenu(id);
  }

  // Restaurant controllers
  @UseGuards(JwtGuard)
  @UseInterceptors(FileInterceptor('file'))
  @Post('/restaurant')
  async createRestaurant(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: createRestaurantDto,
  ) {
    return await this.menuService.createRestaurant(body, file);
  }

  @UseGuards(JwtGuard)
  @Put('/restaurant/:id')
  async updateRestaurant(
    @Param('id') id: number,
    @Body() body: updateRestaurantDto,
  ) {
    return await this.menuService.updateRestaurant(id, body);
  }

  @UseGuards(JwtGuard)
  @Get('/restaurant')
  async getAllRestaurants() {
    return await this.menuService.readRestaurants();
  }

  @UseGuards(JwtGuard)
  @Get('/restaurant/:id')
  async getRestaurantById(@Param('id') id: number) {
    return await this.menuService.getRestaurantById(id);
  }

  @UseGuards(JwtGuard)
  @Delete('/restaurant')
  async deleteRestaurant(@Param('id') id: number) {
    return await this.menuService.deleteRestaurant(id);
  }

  @UseGuards(JwtGuard)
  @Delete('/error/:id')
  async show500Error(@Param('id') id: number) {
    return await this.menuService.show500Error(id);
  }
}
