import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import 'dotenv/config';

import { SharedModule } from './shared/shared.module';
import { VideoModule } from './video/video.module';
import { AuthModule } from './auth/auth.module';
import { FileModule } from './file/file.module';
import { UserModule } from './user/user.module';

const db_url = process.env.DB_URL;

@Module({
  imports: [AuthModule, FileModule, SharedModule, MongooseModule.forRoot(db_url), VideoModule, UserModule],
})
export class AppModule {}
