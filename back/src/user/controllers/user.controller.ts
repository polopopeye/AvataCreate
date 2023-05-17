import { Body, Controller, Post, Put, Req, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '../../auth/auth.guard';
import { UserDto, UserFoundDto } from '../dto/user.dto';
import { UserService } from '../services/user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Post('/create')
  @ApiOperation({
    summary: 'create user in db and return user with token',
  })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
    type: UserDto,
  })
  @ApiResponse({
    status: 202,
    description: 'The user already exists. Return the user.',
    type: UserFoundDto,
  })
  create(@Body() user: UserDto) {
    return this.userService.createNewUser(user);
  }

  @UseGuards(AuthGuard)
  @Put('/update/')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'update user in db',
  })
  @ApiResponse({
    status: 201,
    description: 'update user in db',
    type: UserDto,
  })
  updateUser(@Body() user: UserDto) {
    return this.userService.updateUser(user.id, user);
  }
}
