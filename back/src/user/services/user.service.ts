import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { forwardRef } from '@nestjs/common/utils';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthService } from 'src/auth/services/auth.service';
import { UserDto } from '../dto/user.dto';
import { UserDocument } from '../schemas/user.schema';
import { Inject } from '@nestjs/common/decorators/core/inject.decorator';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('user') private userModel: Model<UserDocument>,

    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  async createNewUser(user: UserDto) {
    const userExists = await this.findUserById(user.id, user.email);
    if (userExists) return userExists;

    await new this.userModel(user)
      .save({ validateBeforeSave: true })
      .catch((err) => {
        throw new HttpException(err, 500);
      });

    const token = await this.authService.getJwtToken(user.id, user.email);

    return {
      ...user,
      token: token.access_token,
    };
  }

  async findUserById(id: string, email?: string) {
    const user = await this.userModel.findOne({ id, email });
    if (!user) {
      return null;
    }
    const { __v, _id, ...userWithoutUnderscore } = user.toObject();
    const token = await this.authService.getJwtToken(
      userWithoutUnderscore.id,
      userWithoutUnderscore.email,
    );

    return {
      ...userWithoutUnderscore,
      token: token.access_token,
    };
  }

  async updateUser(id: string, user: UserDto) {
    const userExists = await this.findUserById(id);
    if (!userExists) {
      throw new BadRequestException('User does not exist');
    }
    const updatedUser = await this.userModel.findOneAndUpdate(
      { id },
      { ...user },
      { new: true },
    );

    const { __v, _id, ...userWithoutUnderscore } = updatedUser.toObject();

    return userWithoutUnderscore;
  }
}
