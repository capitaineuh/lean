import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ArtisansController } from './artisans.controller';
import { ArtisansService } from './artisans.service';
import { User, UserSchema } from '../users/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
  ],
  controllers: [ArtisansController],
  providers: [ArtisansService],
})
export class ArtisansModule {} 