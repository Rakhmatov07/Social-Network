import { Controller, Get, Post, Body, Param, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { AuthGuard } from 'src/shared/guards/auth.guard';
import { IRequest } from 'src/shared/types/request.type';
import { UserService } from './user.service';
import { CommentDto } from './dto/comment.dto';

@ApiTags('User')
@ApiBearerAuth()
@Controller('user')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('comment/:videoId')
  @ApiOperation({ summary: "This route to post comment to video" })
  postComment(@Body() commentDto: CommentDto, @Param('videoId') videoId: string, @Req() req: IRequest) {
    return this.userService.postComment(commentDto, videoId, req);
  }

  @Post('like/:videoId')
  @ApiOperation({ summary: "This route to put like to video" })
  like(@Param('videoId') videoId: string, @Req() req: IRequest) {
    return this.userService.like(videoId, req);
  }

  @Get()
  @ApiOperation({ summary: "This route returns all recommended videos based on user's interest" })
  getVideos(@Req() req: IRequest) {
    return this.userService.getVideos(req);
  }
}
