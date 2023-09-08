import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { UserSchema } from '../shared/models/user.model';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

const jwt_key = process.env.JWT_KEY;

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwt_key,
      signOptions: { expiresIn: '24h' },
    }),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
