import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type AvatarHeadDocument = HydratedDocument<AvatarHead>;
@Schema()
export class AvatarHead {
  @Prop({
    unique: true,
    required: true,
  })
  name: string;

  @Prop()
  output_format: string;

  @Prop()
  style: string;

  @Prop({
    required: true,
  })
  id: string;

  @Prop({
    required: true,
  })
  url: string;

  @Prop({
    default: Date.now,
  })
  updatedAt: Date;

  @Prop({
    default: Date.now,
  })
  createdAt: Date;
}

export const AvatarHeadSchema = SchemaFactory.createForClass(AvatarHead);

export type AvatarBodyDocument = HydratedDocument<AvatarBody>;
@Schema()
export class AvatarBody {
  @Prop({
    unique: true,
    required: true,
  })
  user_id: string;

  @Prop()
  body_id: string;

  @Prop({
    default: Date.now,
  })
  updatedAt: Date;

  @Prop({
    default: Date.now,
  })
  createdAt: Date;
}

export const AvatarBodySchema = SchemaFactory.createForClass(AvatarBody);

export type AvatarDocument = HydratedDocument<Avatar>;
@Schema()
export class Avatar {
  @Prop({
    unique: true,
    required: true,
  })
  name: string;

  @Prop()
  id: string;

  @Prop()
  avatar_link: string;

  @Prop()
  thumbnail_url: string;

  @Prop()
  body_id: string;

  @Prop()
  head_id: string;

  @Prop({
    default: Date.now,
  })
  updatedAt: Date;

  @Prop({
    default: Date.now,
  })
  createdAt: Date;
}

export const AvatarSchema = SchemaFactory.createForClass(Avatar);
