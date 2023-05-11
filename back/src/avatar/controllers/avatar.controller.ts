import { Controller, Get, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { unionsAvatarDto } from '../dto/avatar.dto';
import { AvatarService } from '../services/avatar.service';

@ApiTags('Avatar')
@Controller('avatar')
export class AvatarController {
  constructor(private avatarService: AvatarService) {}
  // // @UseGuards(AuthGuard)
  // @Post('/create')
  // // @ApiBearerAuth()
  // @ApiOperation({
  //   summary: 'create user in db and return user with token',
  // })
  // @ApiResponse({
  //   status: 201,
  //   description: 'The user has been successfully created.',
  //   type: UserDto,
  // })
  // @ApiResponse({
  //   status: 202,
  //   description: 'The user already exists. Return the user.',
  //   type: UserFoundDto,
  // })
  // create(@Body() user: UserDto) {
  //   return this.userService.createNewUser(user);
  // }

  @Get('/bodies')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'get list of bodies',
  })
  @ApiResponse({
    status: 201,
    description: 'Get list of bodies from unionavatars.com',
    type: unionsAvatarDto,
  })
  getBodiesList() {
    return this.avatarService.getBodiesList();
  }
}
