import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { forwardRef } from '@nestjs/common/utils';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthService } from 'src/auth/services/auth.service';
import { UserDto } from '../dto/user.dto';
import { UserDocument } from '../schemas/user.schema';
import { Inject } from '@nestjs/common/decorators/core/inject.decorator';
import { AvatarService } from 'src/avatar/services/avatar.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('user') private userModel: Model<UserDocument>,

    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
    private readonly avatarService: AvatarService,
  ) {}

  async createNewUser(user: UserDto) {
    this.setDefaultBodyToNewUser(user.id);
    const body = (await this.avatarService.findAvatarBodyByUserId(user.id)) || {
      body_id: null,
    };
    const head = (await this.avatarService.findAvatarHeadByName(user.id)) || {
      id: null,
    };
    const avatar = (await this.avatarService.findAvatarByName(user.id)) || {
      id: null,
    };

    const userExists = await this.findUserById(user.id, user.email);
    if (userExists) {
      const token = await this.authService.getJwtToken(user.id, user.email);
      return {
        ...userExists,
        bodyId: body.body_id,
        headId: head.id,
        avatarId: avatar.id,
        token: token.access_token,
      };
    }

    await new this.userModel(user)
      .save({ validateBeforeSave: true })
      .catch((err) => {
        throw new HttpException(err, 500);
      });

    const token = await this.authService.getJwtToken(user.id, user.email);
    return {
      ...user,
      bodyId: body.body_id,
      headId: head.id,
      avatarId: avatar.id,
      token: token.access_token,
    };
  }

  async findUserById(id: string, email?: string) {
    const user = email
      ? await this.userModel.findOne({ id, email })
      : await this.userModel.findOne({ id });
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

    const token = await this.authService.getJwtToken(
      userExists.id,
      userExists.email,
    );

    const { __v, _id, ...userWithoutUnderscore } = updatedUser.toObject();

    return {
      ...userWithoutUnderscore,
      token: token.access_token,
    };
  }

  async setDefaultBodyToNewUser(id: string) {
    const defaultBody = await this.avatarService.findAvatarBodyByUserId(id);
    if (defaultBody) return;

    await this.avatarService.saveAvatarBodyToDB({
      body_id: '4d8ac7df-c579-4ca5-a089-629a2659f3c0',
      user_id: id,
    });
  }
}
