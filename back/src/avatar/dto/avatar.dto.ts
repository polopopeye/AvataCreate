import { ApiProperty } from '@nestjs/swagger';

export class unionsAvatarDto {
  @ApiProperty({
    description: `id of the avatar`,
    example: 'ef0270c7-2183-47f8-97ba-86748849a3a7',
  })
  id: string;

  @ApiProperty({
    description: `name of the avatar`,
    example: 'v1_vox_male_ua_shirtblue',
  })
  name: string;

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
    description: 'style of the avatar',
    example: 'vox',
  })
  style: string;

  @ApiProperty({
    description: 'Url of the model of the avatar',
    example:
      'https://api.unionavatars.com/resource/gAAAAABkWlJ_7fhzZxGQ9rmwuzsz-ZNa5ugMUzgGd01GUpht4KO9ZC0xOGVzGU_--fw7R7JH-giGUGH4QV1d3i0cGkq-9SYPQtbSpT_cUKNXTQOd_OvxTS6KH7vfbQliHX1VpA3I71wkzBNd-e-FViooD66EKE2uytfW6CMXLbGhvLDP_QXia50FNBN-IiXp4tBi9yZkm2BI',
  })
  url: string;
}

// export class UserFoundDto extends unionsAvatarDto {
//   @ApiProperty({
//     description: `Date of edition of the user in DB`,
//     example: '2023-05-01T00:00:00.000Z',
//   })
//   updatedAt: string;

//   @ApiProperty({
//     description: `Date of creation of the user in DB`,
//     example: '2023-05-01T00:00:00.000Z',
//   })
//   createdAt: string;
// }
