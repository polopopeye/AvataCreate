import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserDto, UserFoundDto } from '../dto/user.dto';
import { UserService } from '../services/user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  // @UseGuards(AuthGuard)
  @Post('/create')
  // @ApiBearerAuth()
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
}
