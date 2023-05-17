import { Module } from '@nestjs/common';
import { forwardRef } from '@nestjs/common/utils';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { AvatarModule } from '../avatar/avatar.module';
import { UserController } from './controllers/user.controller';
import { UserSchema } from './schemas/user.schema';
import { UserService } from './services/user.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'user',
        schema: UserSchema,
      },
    ]),
    forwardRef(() => AuthModule),
    AvatarModule,
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
