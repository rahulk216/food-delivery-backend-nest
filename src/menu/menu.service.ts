import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { S3Service } from '../s3/s3.service';
import { toKebabCase } from 'src/utility';

interface createMenu {
  restaurantId: number;
  menu_name: string;
  menu_img: string;
  menu_rating: string;
  menu_price: string;
  menu_description: string;
  menuCategoryId: number;
  isVeg: boolean;
}

interface updateMenu {
  restaurantId?: string;
  menu_name?: string;
  menu_img?: string;
  menu_rating?: string;
  menu_price?: string;
  menu_description?: string;
  menuCategoryId?: number;
  isVeg?: boolean;
}

interface createRestaurant {
  restaurant_name: string;
  restaurant_address: string;
  restaurant_phone: string;
  location: string;
  state: string;
  city: string;
  pincode: number;
}

interface updateRestaurant {
  restaurant_name?: string;
  restaurant_address?: string;
  restaurant_phone?: string;
  location?: string;
  state?: string;
  city?: string;
  pincode?: number;
}

@Injectable()
export class MenuService {
  constructor(
    private readonly prismaService: PrismaService,
    private s3Service: S3Service,
  ) {}

  // Menu creating Api
  async createMenu(body, file): Promise<any> {
    const key = `menu-images/${toKebabCase(body.menu_name)}${Date.now()}`;
    const imageUrl = await this.s3Service.uploadFile(file, key);
    body.menu_img = imageUrl;
    body.restaurantId = parseInt(body.restaurantId);
    body.menu_rating = parseInt(body.menu_rating);

    const createdMenu = await this.prismaService.menu.create({
      data: body,
    });
    if (createdMenu) return createdMenu;
  }

  async updateMenu(id: number, body): Promise<any> {
    const menu = await this.prismaService.menu.findUnique({
      where: { id },
    });

    if (!menu) throw new NotFoundException();

    return await this.prismaService.menu.update({
      where: { id },
      data: body,
    });
  }

  async readMenu(): Promise<any> {
    const menus = await this.prismaService.menu.findMany({
      include: {
        menuCategory: true,
      },
    });
    if (!menus) throw new NotFoundException('');
    return menus;
  }

  async deleteMenu(id): Promise<any> {
    const menu = await this.prismaService.menu.findUnique({
      where: { id },
    });

    if (!menu) throw new HttpException('Menu not found', HttpStatus.NOT_FOUND);

    return await this.prismaService.menu.delete({
      where: { id },
    });
  }

  async getMenuById(id: number): Promise<any> {
    const response = await this.prismaService.menu.findUnique({
      where: { id },
    });

    if (!response) {
      throw new NotFoundException('Menu not found');
    }

    return response;
  }

  async createRestaurant(body: createRestaurant): Promise<any> {
    const createdRestaurant = await this.prismaService.restaurant.create({
      data: body,
    });
    if (createdRestaurant) return createdRestaurant;
  }

  async updateRestaurant(id: number, body: updateRestaurant): Promise<any> {
    const restaurant = await this.prismaService.restaurant.findUnique({
      where: { id },
    });

    if (!restaurant) throw new NotFoundException();

    return await this.prismaService.restaurant.update({
      where: { id },
      data: body,
    });
  }

  async readRestaurants(): Promise<any> {
    const restaurants = await this.prismaService.restaurant.findMany();
    if (restaurants) return restaurants;
  }

  async deleteRestaurant(id: number): Promise<any> {
    const restaurant = await this.prismaService.restaurant.findUnique({
      where: { id },
    });

    if (!restaurant)
      throw new HttpException('Restaurant not found', HttpStatus.NOT_FOUND);

    return await this.prismaService.restaurant.delete({
      where: { id },
    });
  }

  async getRestaurantById(id: number): Promise<any> {
    const response = await this.prismaService.restaurant.findUnique({
      where: { id },
    });

    if (!response) {
      throw new NotFoundException('Restaurant not found');
    }

    return response;
  }
}
