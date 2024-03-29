import {
  IsEmail,
  IsString,
  MinLength,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class signinDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(5)
  password: string;
}

export class signUpDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(5)
  password: string;

  @IsString()
  name: string;

  @IsString()
  phone: string;

  @IsString()
  username: string;

  @IsString()
  @IsOptional()
  image?: string;
}
