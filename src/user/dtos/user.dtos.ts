import { IsNumber, IsString } from 'class-validator';

export class createAddressDto {
  @IsNumber()
  userId: Number;

  @IsString()
  location: string;

  @IsString()
  state: string;

  @IsString()
  city: string;

  @IsNumber()
  pincode: Number;
}
