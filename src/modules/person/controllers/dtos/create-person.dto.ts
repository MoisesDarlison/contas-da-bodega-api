import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateRequestPersonDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsNotEmpty()
  @IsString()
  company: string;
}
