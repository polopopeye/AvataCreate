import { Module } from '@nestjs/common';
import { forwardRef } from '@nestjs/common/utils';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { AuthService } from './services/auth.service';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: 'SECRET_KEY',
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
