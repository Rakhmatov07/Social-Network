import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';

import { VideoSchema } from 'src/shared/models/video.model';
import { UserSchema } from 'src/shared/models/user.model';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Video', schema: VideoSchema }, { name: 'User', schema: UserSchema }])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
