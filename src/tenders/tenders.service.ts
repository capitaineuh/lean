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
    const createdTender = new this.tenderModel(createTenderDto);
    return createdTender.save();
  }

  async findAll(): Promise<Tender[]> {
    return this.tenderModel.find().exec();
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
}
