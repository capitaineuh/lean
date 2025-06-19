import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { TendersService } from './tenders.service';
import { Tender } from './schemas/tender.schema';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateTenderDto } from './dto/create-tender.dto';
import { UpdateTenderDto } from './dto/update-tender.dto';

@Controller('tenders')
export class TendersController {
  constructor(private readonly tendersService: TendersService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createTenderDto: CreateTenderDto): Promise<Tender> {
    return this.tendersService.create(createTenderDto);
  }

  @Get()
  findAll(): Promise<Tender[]> {
    return this.tendersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Tender> {
    return this.tendersService.findOne(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateTenderDto: UpdateTenderDto): Promise<Tender> {
    return this.tendersService.update(id, updateTenderDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string): Promise<Tender> {
    return this.tendersService.remove(id);
  }

  @Post(':id/apply')
  @UseGuards(JwtAuthGuard)
  applyToTender(
    @Param('id') id: string,
    @Body('userId') userId: string,
  ): Promise<Tender> {
    return this.tendersService.applyToTender(id, userId);
  }
}
