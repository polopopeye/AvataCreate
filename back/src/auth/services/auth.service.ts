import { BadRequestException, Injectable } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/services/user.service';
import { UserDto } from 'src/user/dto/user.dto';
import { forwardRef } from '@nestjs/common/utils';
import { Inject } from '@nestjs/common/decorators/core/inject.decorator';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async getJwtToken(id: string, email: string) {
    const payload = { id, email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
