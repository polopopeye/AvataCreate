import { ApiProperty } from '@nestjs/swagger';

export enum avatarStyle {
  vox = 'vox',
  phr = 'phr',
  sca = 'sca',
}

export enum avatarOutputFormat {
  glb = 'glb',
  fbx = 'fbx',
}

export class commonAvatarDto {
  @ApiProperty({
    description: `name of the avatar`,
    example: 'v1_vox_male_ua_shirtblue',
  })
  name: string;

  @ApiProperty({
    description: 'style of the avatar',
    example: 'phr',
  })
  style?: avatarStyle;
}

export class unionsAvatarDto extends commonAvatarDto {
  @ApiProperty({
    description: `id of the avatar`,
    example: '4d8ac7df-c579-4ca5-a089-629a2659f3c0',
  })
  id: string;

  @ApiProperty({
    description: `TODO: search what this prop does`,
    example: 'default',
  })
  source_type: string;

  @ApiProperty({
    description: "URL of the avatar's thumbnail",
    example:
      'https://union-thumbnail-body.s3.eu-central-1.amazonaws.com/Thumbnail_v1_vox_male_ua_shirtblue.png',
  })
  thumbnail_url: string;

  @ApiProperty({
    description: 'Url of the model of the avatar',
    example:
      'https://api.unionavatars.com/resource/gAAAAABkWlJ_7fhzZxGQ9rmwuzsz-ZNa5ugMUzgGd01GUpht4KO9ZC0xOGVzGU_--fw7R7JH-giGUGH4QV1d3i0cGkq-9SYPQtbSpT_cUKNXTQOd_OvxTS6KH7vfbQliHX1VpA3I71wkzBNd-e-FViooD66EKE2uytfW6CMXLbGhvLDP_QXia50FNBN-IiXp4tBi9yZkm2BI',
  })
  url: string;
}

export class createAvatarDto extends commonAvatarDto {
  @ApiProperty({ description: 'format of  the output file', example: 'glb' })
  output_format?: avatarOutputFormat;

  @ApiProperty({
    description: 'image to create the avatar',
    example: 'IMAGE IN base64 or binary STRING',
  })
  img: string;

  @ApiProperty({
    description: 'id of the head',
    example: '50d65676-2323-4341-81ba-2dd8d054c712',
  })
  head_id: string;

  @ApiProperty({
    description: 'id of the body',
    example: '4d8ac7df-c579-4ca5-a089-629a2659f3c0',
  })
  body_id: string;

  @ApiProperty({
    description: 'id of the collection',
    example: '8372ab34-c26c-4df5-a3ba-5536f4c544ee',
  })
  collection_id?: string;

  @ApiProperty({ description: 'generate thumbnail?', example: true })
  create_thumbnail: boolean;

  @ApiProperty({ description: 'optimize the model?', example: true })
  optimize: boolean;
}

export class createAvatarResponseDto extends commonAvatarDto {
  @ApiProperty({
    description: `id of the avatar`,
    example: '4d8ac7df-c579-4ca5-a089-629a2659f3c0',
  })
  id: string;

  @ApiProperty({
    description: 'output format of the avatar',
    example: 'glb',
  })
  output_format: string;

  @ApiProperty({ description: 'link to the avatar', example: 'link' })
  avatar_link: string;

  @ApiProperty({ description: 'created at', example: '2021-08-05T12:00:00Z' })
  created_at: string;

  @ApiProperty({ description: 'link to the thumbnail', example: 'link' })
  thumbnail_url: string;

  @ApiProperty({ description: 'body id of the avatar', example: 'body_id' })
  body_id: string;

  @ApiProperty({ description: 'head id of the avatar', example: 'head_id' })
  head_id: string;
}
