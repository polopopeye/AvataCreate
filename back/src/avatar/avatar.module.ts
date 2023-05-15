import { Module } from '@nestjs/common';
import { forwardRef } from '@nestjs/common/utils';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { AvatarController } from './controllers/avatar.controller';
import {
  AvatarBodySchema,
  AvatarHeadSchema,
  AvatarSchema,
} from './schemas/avatar.schema';
import { AvatarService } from './services/avatar.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'avatarHead',
        schema: AvatarHeadSchema,
      },
      {
        name: 'avatarBody',
        schema: AvatarBodySchema,
      },
      {
        name: 'avatar',
        schema: AvatarSchema,
      },
    ]),
  ],
  controllers: [AvatarController],
  providers: [AvatarService],
  exports: [AvatarService],
})
export class AvatarModule {}
