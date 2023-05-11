import { Module } from '@nestjs/common';
import { AvatarController } from './controllers/avatar.controller';
import { AvatarService } from './services/avatar.service';

@Module({
  imports: [],
  controllers: [AvatarController],
  providers: [AvatarService],
  exports: [AvatarService],
})
export class AvatarModule {}
