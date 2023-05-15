import { ApiProperty } from '@nestjs/swagger';

export class saveBodyInputDto {
  @ApiProperty({ description: 'id of the body', example: 'UID' })
  body_id: string;

  @ApiProperty({ description: 'id of the user', example: 'UID' })
  user_id: string;
}
