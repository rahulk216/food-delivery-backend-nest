import {
  IsString,
  IsNumber,
  IsArray,
  IsOptional,
  IsObject,
} from 'class-validator';

export class createOrderDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  order_total: number;

  @IsString()
  order_items: string;

  @IsNumber()
  @IsOptional()
  payment_id?: number;

  @IsString()
  order_type: string;

  @IsObject()
  address: object;

  @IsString()
  delivery_status: string;
}
