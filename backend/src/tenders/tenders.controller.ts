import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, Query, Request, Patch } from '@nestjs/common';
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
  async create(@Body() createTenderDto: CreateTenderDto, @Request() req): Promise<Tender> {
    console.log('[TENDER][CONTROLLER] req.user complet :', req.user);
    createTenderDto.clientId = req.user.sub || req.user.userId || req.user.id || req.user._id;
    console.log('[TENDER][CONTROLLER] DTO envoyé au service :', createTenderDto);
    const result = await this.tendersService.create(createTenderDto);
    console.log('[TENDER][CONTROLLER] Résultat création :', result);
    return result;
  }

  @Get()
  findAll(
    @Query('location') location?: string,
    @Query('category') category?: string,
  ): Promise<Tender[]> {
    return this.tendersService.findAll({ location, category });
  }

  @Get('candidatures/:userId')
  @UseGuards(JwtAuthGuard)
  getCandidaturesByUser(@Param('userId') userId: string): Promise<Tender[]> {
    console.log('ROUTE CANDIDATURES appelée', userId);
    return this.tendersService.findByApplicant(userId);
  }

  @Get('mes-projets/:userId')
  @UseGuards(JwtAuthGuard)
  getMesProjets(@Param('userId') userId: string): Promise<Tender[]> {
    return this.tendersService.findByClient(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Tender> {
    console.log('ROUTE FINDONE appelée', id);
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

  @Delete(':id/cancel')
  @UseGuards(JwtAuthGuard)
  cancelCandidature(
    @Param('id') id: string,
    @Body('userId') userId: string,
  ): Promise<Tender> {
    return this.tendersService.cancelCandidature(id, userId);
  }

  @Patch(':id/accept')
  @UseGuards(JwtAuthGuard)
  acceptCandidature(
    @Param('id') id: string,
    @Body('userId') userId: string,
  ): Promise<Tender> {
    return this.tendersService.acceptCandidature(id, userId);
  }

  @Delete(':id/refuse')
  @UseGuards(JwtAuthGuard)
  refuseCandidature(
    @Param('id') id: string,
    @Body('userId') userId: string,
  ): Promise<Tender> {
    return this.tendersService.refuseCandidature(id, userId);
  }
}
