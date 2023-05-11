import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { unionsAvatarDto } from '../dto/avatar.dto';
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
}
