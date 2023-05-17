import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '../../auth/auth.guard';
import { createAvatarDto, unionsAvatarDto } from '../dto/avatar.dto';
import { saveBodyInputDto } from '../dto/body.dto';
import { unionsAvatarCreateHeadDto } from '../dto/heads.dto';
import { AvatarService } from '../services/avatar.service';

@ApiTags('Avatar')
@Controller('avatar')
export class AvatarController {
  constructor(private avatarService: AvatarService) {}

  @Post('/create')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'create avatar',
  })
  @ApiResponse({
    status: 201,
    description: 'The avatar has been successfully created.',
    type: unionsAvatarDto,
  })
  async create(@Body() createAvatarInput: createAvatarDto) {
    const existingAvatar = await this.avatarService.validateAvatar({
      name: createAvatarInput.name,
      head_id: createAvatarInput.head_id,
      body_id: createAvatarInput.body_id,
    });

    if (existingAvatar) return existingAvatar;

    const avatar = await this.avatarService.createAvatar(createAvatarInput);

    return await this.avatarService.saveAvatarToDB(avatar);
  }

  @Post('/create/head')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'create head avatar',
  })
  @ApiResponse({
    status: 201,
    description: 'The head avatar has been successfully created.',
    type: unionsAvatarDto,
  })
  async createAvatarHeadFromImage(
    @Body() createAvatarInput: unionsAvatarCreateHeadDto,
  ) {
    const avatarHead = await this.avatarService.createAvatarHeadFromImage(
      createAvatarInput,
    );
    console.log(`fastlog => avatarHead:`, avatarHead);

    return await this.avatarService.saveAvatarHeadToDB(avatarHead);
  }

  @Post('/create/body')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Save body avatar to DB',
  })
  @ApiResponse({
    status: 201,
    description: 'save body avatar to DB',
    type: unionsAvatarDto,
  })
  async saveAvatarBodyToDB(@Body() saveAvatarBodyInput: saveBodyInputDto) {
    return await this.avatarService.saveAvatarBodyToDB(saveAvatarBodyInput);
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
  async getBodiesList() {
    return await this.avatarService.getBodiesList();
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
  async getHeadsList() {
    return await this.avatarService.getHeadsList();
  }

  @Get('/head/:userId')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'get head by user id',
  })
  @ApiResponse({
    status: 201,
    description: 'Get head by user id',
    type: [unionsAvatarDto],
  })
  async findAvatarHeadByName(@Query('userId') userId: string) {
    return await this.avatarService.findAvatarHeadByName(userId);
  }

  @Get('/avatar/:userId')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'get avatar by user id',
  })
  @ApiResponse({
    status: 201,
    description: 'Get avatar by user id',
    type: [unionsAvatarDto],
  })
  async findAvatarByName(@Query('userId') userId: string) {
    return await this.avatarService.findAvatarByName(userId);
  }
}

// TODO: check swagger docs
