import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tender } from './schemas/tender.schema';
import { CreateTenderDto } from './dto/create-tender.dto';
import { UpdateTenderDto } from './dto/update-tender.dto';

@Injectable()
export class TendersService {
  constructor(
    @InjectModel(Tender.name) private tenderModel: Model<Tender>,
  ) {}

  async create(createTenderDto: CreateTenderDto): Promise<Tender> {
    console.log('[TENDER] Tentative de création :', createTenderDto);
    const createdTender = new this.tenderModel(createTenderDto);
    const savedTender = await createdTender.save();
    console.log('[TENDER] Sauvegardé en base :', savedTender);
    return savedTender;
  }

  async findAll(filters: { location?: string; category?: string }): Promise<Tender[]> {
    const query: any = {};
    if (filters.location) {
      query.location = { $regex: filters.location, $options: 'i' };
    }
    if (filters.category) {
      query.category = filters.category;
    }
    return this.tenderModel.find(query).exec();
  }

  async findOne(id: string): Promise<Tender> {
    const tender = await this.tenderModel.findById(id).exec();
    if (!tender) {
      throw new NotFoundException(`Tender with ID ${id} not found`);
    }
    return tender;
  }

  async update(id: string, updateTenderDto: UpdateTenderDto): Promise<Tender> {
    const tender = await this.tenderModel
      .findByIdAndUpdate(id, updateTenderDto, { new: true })
      .exec();
    if (!tender) {
      throw new NotFoundException(`Tender with ID ${id} not found`);
    }
    return tender;
  }

  async remove(id: string): Promise<Tender> {
    const tender = await this.tenderModel.findByIdAndDelete(id).exec();
    if (!tender) {
      throw new NotFoundException(`Tender with ID ${id} not found`);
    }
    return tender;
  }

  async applyToTender(tenderId: string, userId: string): Promise<Tender> {
    const tender = await this.tenderModel
      .findByIdAndUpdate(
        tenderId,
        { $addToSet: { applicants: userId } },
        { new: true },
      )
      .exec();
    if (!tender) {
      throw new NotFoundException(`Tender with ID ${tenderId} not found`);
    }
    return tender;
  }

  async findByApplicant(userId: string): Promise<Tender[]> {
    return this.tenderModel.find({ applicants: userId }).exec();
  }

  async cancelCandidature(tenderId: string, userId: string): Promise<Tender> {
    const tender = await this.tenderModel.findByIdAndUpdate(
      tenderId,
      { $pull: { applicants: userId } },
      { new: true }
    ).exec();
    if (!tender) {
      throw new NotFoundException(`Tender with ID ${tenderId} not found`);
    }
    return tender;
  }

  async findByClient(userId: string): Promise<Tender[]> {
    return this.tenderModel.find({ clientId: userId }).exec();
  }

  async acceptCandidature(tenderId: string, userId: string): Promise<Tender> {
    const tender = await this.tenderModel.findByIdAndUpdate(
      tenderId,
      {
        $addToSet: { validatedApplicants: userId },
        $pull: { applicants: userId },
      },
      { new: true }
    ).exec();
    if (!tender) {
      throw new NotFoundException(`Tender with ID ${tenderId} not found`);
    }
    return tender;
  }

  async refuseCandidature(tenderId: string, userId: string): Promise<Tender> {
    const tender = await this.tenderModel.findByIdAndUpdate(
      tenderId,
      {
        $pull: { applicants: userId, validatedApplicants: userId },
      },
      { new: true }
    ).exec();
    if (!tender) {
      throw new NotFoundException(`Tender with ID ${tenderId} not found`);
    }
    return tender;
  }
}
