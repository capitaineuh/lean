import { IsString, IsNumber, IsDate, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateTenderDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  budget: number;

  @IsDate()
  @IsNotEmpty()
  deadline: Date;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsString()
  @IsOptional()
  clientId?: string;
} 