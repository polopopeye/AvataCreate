import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { createAvatarDto, unionsAvatarDto } from '../dto/avatar.dto';
import { AvatarService } from '../services/avatar.service';

@ApiTags('Avatar')
@Controller('avatar')
export class AvatarController {
  constructor(private avatarService: AvatarService) {}

  @Post('/create')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'create user in db and return user with token',
  })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
    type: unionsAvatarDto,
  })
  create(@Body() createAvatarInput: createAvatarDto) {
    return this.avatarService.createAvatarFromImage(createAvatarInput);
  }

  @Get('/bodies')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'get list of bodies',
  })
  @ApiResponse({
    status: 201,
    description: 'Get list of bodies from unionavatars.com',
    type: [unionsAvatarDto],
  })
  getBodiesList() {
    return this.avatarService.getBodiesList();
  }

  @Get('/heads')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'get list of heads',
  })
  @ApiResponse({
    status: 201,
    description: 'Get list of heads from unionavatars.com',
    type: [unionsAvatarDto],
  })
  getHeadsList() {
    return this.avatarService.getHeadsList();
  }
}
