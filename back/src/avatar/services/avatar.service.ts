import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import axios from 'axios';
import { Model } from 'mongoose';
import {
  createAvatarDto,
  createAvatarResponseDto,
  unionsAvatarDto,
} from '../dto/avatar.dto';
import { saveBodyInputDto } from '../dto/body.dto';
import {
  unionsAvatarCreateHeadDto,
  unionsAvatarCreateHeadResponseDto,
  unionsAvatarHeadDto,
} from '../dto/heads.dto';
import {
  AvatarBodyDocument,
  AvatarDocument,
  AvatarHeadDocument,
} from '../schemas/avatar.schema';
import { unionsApi } from './constants';

@Injectable()
export class AvatarService {
  constructor(
    private configService: ConfigService,
    @InjectModel('avatar')
    private avatarModel: Model<AvatarDocument>,
    @InjectModel('avatarHead')
    private avatarHeadModel: Model<AvatarHeadDocument>,
    @InjectModel('avatarBody')
    private avatarBodyModel: Model<AvatarBodyDocument>,
  ) {}

  async getBodiesList() {
    const token = this.configService.get<string>('UNION_TOKEN');

    const res = await axios
      .get(unionsApi.getBodiesList, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .catch((err) => {
        console.log(err);
        return err;
      });

    return res.data as unionsAvatarDto;
  }

  async getHeadsList() {
    const token = this.configService.get<string>('UNION_TOKEN');

    const res = await axios
      .get(unionsApi.getHeadsList, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .catch((err) => {
        console.log(err);
        return err;
      });

    return res.data as unionsAvatarHeadDto;
  }

  async createAvatar(createAvatarInput: createAvatarDto) {
    const token = this.configService.get<string>('UNION_TOKEN');

    const res = await axios
      .post(unionsApi.createAvatarFromImage, createAvatarInput, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response.data);
        return err;
      });

    console.log(res.data);
    return res.data as createAvatarResponseDto;
  }

  async saveAvatarToDB(avatarData: createAvatarResponseDto) {
    // check if avatar exists in db
    const avatar = await this.findAvatarByName(avatarData.name);

    if (avatar) {
      // update avatar
      avatar.name = avatarData.name;
      avatar.id = avatarData.id;
      avatar.avatar_link = avatarData.avatar_link;
      avatar.thumbnail_url = avatarData.thumbnail_url;
      avatar.body_id = avatarData.body_id;
      avatar.head_id = avatarData.head_id;
      avatar.save();

      return avatar;
    } else {
      const avatar = new this.avatarModel({
        name: avatarData.name,
        id: avatarData.id,
        avatar_link: avatarData.avatar_link,
        thumbnail_url: avatarData.thumbnail_url,
        body_id: avatarData.body_id,
        head_id: avatarData.head_id,
      });

      return await avatar.save();
    }
  }

  async findAvatarByName(name: string) {
    return await this.avatarModel.findOne({ name: name });
  }

  async validateAvatar(avatarData: {
    name: string;
    body_id: string;
    head_id: string;
  }) {
    const existingAvatar = await this.avatarModel.findOne({
      name: avatarData.name,
      body_id: avatarData.body_id,
      head_id: avatarData.head_id,
    });

    return existingAvatar;
  }

  async createAvatarHeadFromImage(
    createAvatarInput: unionsAvatarCreateHeadDto,
  ) {
    const token = this.configService.get<string>('UNION_TOKEN');

    const res = await axios
      .post(unionsApi.getHeadsList, createAvatarInput, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response.data);
        return err;
      });

    console.log(res.data);
    return res.data as unionsAvatarCreateHeadResponseDto;
  }

  async saveAvatarHeadToDB(avatarHeadData: unionsAvatarCreateHeadResponseDto) {
    // check if avatar head exists in db
    const avatarHead = await this.findAvatarHeadByName(avatarHeadData.name);

    if (avatarHead) {
      // update avatar head
      avatarHead.name = avatarHeadData.name;
      avatarHead.output_format = avatarHeadData.output_format;
      avatarHead.style = avatarHeadData.style;
      avatarHead.id = avatarHeadData.id;
      avatarHead.url = avatarHeadData.url;
      avatarHead.save();

      return avatarHead;
    } else {
      const avatarHead = new this.avatarHeadModel({
        name: avatarHeadData.name,
        output_format: avatarHeadData.output_format,
        style: avatarHeadData.style,
        id: avatarHeadData.id,
        url: avatarHeadData.url,
      });
      await avatarHead.save();
      return avatarHead;
    }
  }
  async findAvatarHeadByName(name: string) {
    return await this.avatarHeadModel.findOne({ name: name });
  }

  async saveAvatarBodyToDB(bodyInput: saveBodyInputDto) {
    const avatarBody = await this.findAvatarBodyByUserId(bodyInput.user_id);

    if (avatarBody) {
      // update avatar body
      avatarBody.user_id = bodyInput.user_id;
      avatarBody.body_id = bodyInput.body_id;
      avatarBody.save();

      return avatarBody;
    } else {
      const avatarBody = new this.avatarBodyModel({
        user_id: bodyInput.user_id,
        body_id: bodyInput.body_id,
      });
      await avatarBody.save();
      return avatarBody;
    }
  }

  async findAvatarBodyByUserId(user_id: string) {
    return await this.avatarBodyModel.findOne({ user_id: user_id });
  }
}
