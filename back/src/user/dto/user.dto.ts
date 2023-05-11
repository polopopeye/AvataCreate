import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({ description: `Id of the user in DB`, example: '1234567890' })
  id: string;

  @ApiProperty({ description: `Name of the user in DB`, example: 'John Doe' })
  displayName: string;

  @ApiProperty({
    description: `Email of the user in DB`,
    example: 'test@email.com',
  })
  email: string;

  @ApiProperty({
    description: `PhotoURL of the user in DB`,
    example: 'randomurl',
  })
  coverImg: string;

  @ApiProperty({ description: `default language user`, example: 'en' })
  language: string;

  token?: string;
}

export class UserFoundDto extends UserDto {
  @ApiProperty({
    description: `Date of edition of the user in DB`,
    example: '2023-05-01T00:00:00.000Z',
  })
  updatedAt: string;

  @ApiProperty({
    description: `Date of creation of the user in DB`,
    example: '2023-05-01T00:00:00.000Z',
  })
  createdAt: string;
}
