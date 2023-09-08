import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';

import { VideoSchema } from 'src/shared/models/video.model';
import { VideoController } from './video.controller';
import { VideoService } from './video.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Video', schema: VideoSchema }])],
  controllers: [VideoController],
  providers: [VideoService],
})
export class VideoModule {}
