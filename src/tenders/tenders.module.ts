import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TendersService } from './tenders.service';
import { TendersController } from './tenders.controller';
import { Tender, TenderSchema } from './schemas/tender.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Tender.name, schema: TenderSchema }]),
  ],
  controllers: [TendersController],
  providers: [TendersService],
  exports: [TendersService],
})
export class TendersModule {}
