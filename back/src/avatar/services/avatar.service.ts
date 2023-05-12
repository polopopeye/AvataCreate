import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import {
  createAvatarDto,
  createAvatarResponseDto,
  unionsAvatarDto,
} from '../dto/avatar.dto';
import { unionsAvatarHeadDto } from '../dto/heads.dto';
import { unionsApi } from './constants';

@Injectable()
export class AvatarService {
  constructor(private configService: ConfigService) {}

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

  async createAvatarFromImage(createAvatarInput: createAvatarDto) {
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
}
