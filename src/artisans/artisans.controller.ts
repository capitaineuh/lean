import { Controller, Get, Query } from '@nestjs/common';
import { ArtisansService } from './artisans.service';

@Controller('artisans')
export class ArtisansController {
  constructor(private readonly artisansService: ArtisansService) {}

  @Get()
  async findAll(
    @Query('metier') metier?: string,
    @Query('localisation') localisation?: string,
    @Query('note') note?: string,
  ) {
    return this.artisansService.findAll({
      metier,
      localisation,
      note: note ? parseInt(note) : undefined,
    });
  }
} 