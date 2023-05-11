import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type UserDocument = HydratedDocument<User>;
@Schema()
export class User {
  @Prop({
    unique: true,
    required: true,
  })
  id: string;

  @Prop()
  displayName: string;

  @Prop({
    unique: true,
    required: true,
  })
  email: string;

  @Prop()
  coverImg: string;

  @Prop({
    default: 'en',
  })
  language: string;

  @Prop({
    default: Date.now,
  })
  updatedAt: Date;

  @Prop({
    default: Date.now,
  })
  createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
