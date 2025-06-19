import { IsEmail, IsString, IsBoolean, IsOptional, MinLength } from 'class-validator';

export class RegisterDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  phone: string;

  @IsBoolean()
  isArtisan: boolean;

  @IsString()
  @IsOptional()
  metier?: string;

  @IsString()
  localisation: string;
} 