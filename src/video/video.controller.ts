import { Controller, Get, Post, Body, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { AuthGuard } from 'src/shared/guards/auth.guard';
import { IRequest } from 'src/shared/types/request.type';
import { CreateVideoDto } from './dto/create-video.dto';
import { VideoService } from './video.service';

@ApiTags('Video')
@ApiBearerAuth()
@Controller('video')
@UseGuards(AuthGuard)
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Post()
  @ApiOperation({ summary: "This route returns created new video" })
  create(@Body() createVideoDto: CreateVideoDto, @Req() req: IRequest) {
    return this.videoService.create(createVideoDto, req);
  }

  @Delete(':id')
  @ApiOperation({ summary: "This route returns deleted video" })
  remove(@Param('id') id: string) {
    return this.videoService.remove(id);
  }
}
