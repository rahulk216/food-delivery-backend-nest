import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class createMenuDto {
  @IsNumber()
  restaurantId: number;

  @IsString()
  menu_name: string;

  @IsString()
  menu_img: string;

  @IsString()
  menu_rating: string;

  @IsString()
  menu_price: string;

  @IsString()
  menu_description: string;

  @IsNumber()
  menuCategoryId: number;

  @IsBoolean()
  isVeg: boolean;
}

export class updateMenuDto {
  @IsNumber()
  @IsOptional()
  restaurantId?: number;

  @IsString()
  @IsOptional()
  menu_name?: string;

  @IsString()
  @IsOptional()
  menu_img?: string;

  @IsString()
  @IsOptional()
  menu_rating?: string;

  @IsString()
  @IsOptional()
  menu_price?: string;

  @IsString()
  @IsOptional()
  menu_description?: string;

  @IsNumber()
  @IsOptional()
  menuCategoryId?: number;

  @IsBoolean()
  @IsOptional()
  isVeg: boolean;
}

export class createRestaurantDto {
  @IsString()
  restaurant_name: string;

  @IsString()
  restaurant_address: string;

  @IsString()
  restaurant_phone: string;

  @IsString()
  location: string;

  @IsString()
  state: string;

  @IsString()
  city: string;

  @IsNumber()
  pincode: number;
}

export class updateRestaurantDto {
  @IsString()
  @IsOptional()
  restaurant_name?: string;

  @IsString()
  @IsOptional()
  restaurant_address?: string;

  @IsString()
  @IsOptional()
  restaurant_phone?: string;

  @IsString()
  @IsOptional()
  location?: string;

  @IsString()
  @IsOptional()
  state?: string;

  @IsString()
  @IsOptional()
  city?: string;

  @IsNumber()
  @IsOptional()
  pincode?: number;
}
