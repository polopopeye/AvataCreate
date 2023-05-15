import { ApiProperty } from '@nestjs/swagger';
import { avatarOutputFormat, avatarStyle, commonAvatarDto } from './avatar.dto';

class hairDto {
  @ApiProperty({ description: 'name of the hair', example: 'hair_ua_1' })
  name: string;

  @ApiProperty({
    description: 'url of the hair',
    example: 'http://example.com',
  })
  url: string;

  @ApiProperty({
    description: 'metadata of the hair',
    example: 'http://example.com',
  })
  hair_metadata: any;

  @ApiProperty({ description: 'id of the user', example: 'UID' })
  user_id: string;

  @ApiProperty({
    description: 'url of the thumbnail hair',
    example: 'http://example.com',
  })
  thumbnail_url: string;

  @ApiProperty({ description: 'style the hair', example: 'phr' })
  style: avatarStyle;

  @ApiProperty({ description: 'id of the hair', example: 'UID' })
  id: string;

  @ApiProperty({
    description: 'created at',
    example: '2021-07-07T14:00:00.000Z',
  })
  created_at: string;
}

export class unionsAvatarHeadDto extends commonAvatarDto {
  @ApiProperty({ description: 'format of  the output file', example: 'fbx' })
  output_format: avatarOutputFormat;

  @ApiProperty({ description: 'id of the head', example: 'UID' })
  id: string;

  @ApiProperty({ description: 'url of the head model', example: 'UID' })
  url: string;

  @ApiProperty({
    description: 'created at',
    example: '2021-07-07T14:00:00.000Z',
  })
  created_at: string;

  hair: any;
}

export class unionsAvatarCreateHeadDto extends commonAvatarDto {
  output_format: avatarOutputFormat;
  selfie_img: string;
  hair_id?: string;
  hair_color?: string;
}

export class unionsAvatarCreateHeadResponseDto extends commonAvatarDto {
  output_format: avatarOutputFormat;
  id: string;
  url: string;
  created_at: string;
  hair: hairDto;
}
