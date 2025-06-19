import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../users/schemas/user.schema';

interface FindAllOptions {
  metier?: string;
  localisation?: string;
  note?: number;
}

@Injectable()
export class ArtisansService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async findAll(options: FindAllOptions) {
    const query: any = {};

    // Filtre par métier
    if (options.metier) {
      query.metier = options.metier;
    }

    // Filtre par localisation (recherche insensible à la casse)
    if (options.localisation) {
      query.localisation = {
        $regex: options.localisation,
        $options: 'i'
      };
    }

    // Filtre par note minimum
    if (options.note) {
      query.note = { $gte: options.note };
    }

    // Récupère uniquement les artisans (exclut les clients)
    query.role = 'artisan';

    const artisans = await this.userModel.find(query).select({
      _id: 1,
      firstName: 1,
      lastName: 1,
      metier: 1,
      competences: 1,
      localisation: 1,
      note: 1,
      projetsRealises: 1
    });

    return artisans.map(artisan => ({
      id: artisan._id.toString(),
      firstName: artisan.firstName,
      lastName: artisan.lastName,
      metier: artisan.metier,
      competences: artisan.competences || [],
      localisation: artisan.localisation,
      note: artisan.note || 0,
      projetsRealises: artisan.projetsRealises || 0
    }));
  }
} 