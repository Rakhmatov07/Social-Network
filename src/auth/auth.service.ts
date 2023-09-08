import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model } from "mongoose";
import * as argon from "argon2";

import { LoginDto, RegisterDto } from './dto';

@Injectable()
export class AuthService {
  constructor( private readonly jwtService: JwtService, @InjectModel('User') private userModel: Model<any> ){}

  async register({ firstname, lastname, email, password, age, gender, country }: RegisterDto) {
    const user = await this.userModel.findOne({email});
    if(user) throw new ForbiddenException('User already registered!');

    const hash = await argon.hash(password);
    const newUser = await this.userModel.create({ firstname, lastname, email, password: hash, age, gender, country });

    const token = this.jwtService.sign({ id: newUser.id });
    return { message: 'Success', token };
  }

  async login({ email, password }: LoginDto) {
    const user = await this.userModel.findOne({ email });
    if(!user) throw new ForbiddenException('User Not Found!');

    const checkPass = await argon.verify(user.password, password);
    if(!checkPass) throw new ForbiddenException('Wrong Password');

    const token = this.jwtService.sign({ id: user.id });
    return { message: 'Success', token };
  }
}
