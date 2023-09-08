import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

import { IRequest } from 'src/shared/types/request.type';
import { CreateVideoDto } from './dto/create-video.dto';

@Injectable()
export class VideoService {
  constructor(@InjectModel('Video') private videoModel: Model<any>){}

  async create(createVideoDto: CreateVideoDto, req: IRequest) {
    const newVideo = await this.videoModel.create({...createVideoDto, userId: req.user});
    return({ message: 'Created', newVideo }); 
  }

  async remove(id: string) {
    const dtVideo = await this.videoModel.findByIdAndDelete(id);
    return { message: 'Successfully deleted', dtVideo };
  }
}
