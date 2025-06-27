import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  phone?: string;

  @Prop({ required: true })
  isArtisan: boolean;

  // Champs spécifiques au Particulier
  @Prop()
  dateNaissance?: string;

  @Prop()
  genre?: string;

  @Prop()
  adresseParticulier?: string;

  @Prop()
  codePostalParticulier?: string;

  @Prop()
  villeParticulier?: string;

  // Champs spécifiques à l'Artisan
  @Prop()
  siret?: string;

  @Prop()
  adresse?: string;

  @Prop()
  codePostal?: string;

  @Prop()
  ville?: string;

  @Prop()
  description?: string;

  @Prop()
  tarifHoraire?: string;

  @Prop()
  metier?: string;

  @Prop([String])
  competences?: string[];

  @Prop()
  localisation?: string;

  @Prop({ default: 0 })
  note?: number;

  @Prop({ default: 0 })
  projetsRealises?: number;

  @Prop({ default: Date.now })
  createdAt: Date;

  toObject() {
    const obj = this.toObject();
    delete obj.password;
    return obj;
  }
}

export const UserSchema = SchemaFactory.createForClass(User); 