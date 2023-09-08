import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { IRequest } from 'src/shared/types/request.type';
import { CommentDto } from './dto/comment.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel('Video') private readonly videoModel: Model<any>,
              @InjectModel('User') private readonly userModel: Model<any>){};

  async postComment({ text }: CommentDto, videoId: string, req: IRequest) {
    try {
      const video = await this.videoModel.findById(videoId);
      video.comments.push({ text, userId: req.user });
      
      const user = await this.userModel.findById(req.user);
      user.watchedVideos.push(video.title);

      await video.save();
      await user.save();

      return { message: 'Success' };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async like(videoId: string, req: IRequest) {
    try {
      const video = await this.videoModel.findById(videoId);
      video.likes.userIds.push(req.user);
      video.likes.count += 1;
      
      const user = await this.userModel.findById(req.user);
      user.watchedVideos.push(video.title);

      await video.save();
      await user.save();

      return { message: 'Success' };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getVideos(req: IRequest) {
    try {
      const { watchedVideos } = await this.userModel.findById(req.user);

      const recommendedVideos = await Promise.all(
        watchedVideos.map(async (title: string) => {
          return this.videoModel.find({
            title: { $regex: title, $options: 'i' },
          }).limit(20);
        })
      );

      return { message: 'Success', recommendedVideos: this.shuffleArray(recommendedVideos[1])}
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  private shuffleArray(array: []) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}
