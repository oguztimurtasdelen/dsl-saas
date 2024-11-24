import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { User } from '../user/user.schema';
import { UserType } from '../user/user.type';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { bcrypt } from "bcrypt";

@Injectable()
export class AuthenticationService {

  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async registerUser(userType: UserType): Promise<User> {
    const _user = await this.userModel.create(userType);
    
    return _user;
  }

  async loginUser(loginDto: LoginDto) {
    const user = await this.userModel.findOne({email: loginDto.email}).exec();
    if(!user) {
      throw new HttpException(
        { success: false, message: 'Invalid password or username' },
        HttpStatus.UNAUTHORIZED,
      );
    }
    //const isValid = await bcrypt.compare(loginDto.password, user.password);
    if (loginDto.password == user.password ) {
        return {success: true}
    }else {
      throw new HttpException(
        { success: false, message: 'Invalid password' },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  async findAll() {
    return `This action returns all authentication`;
  }

  findOne(id: number) {
    return `This action returns a #${id} authentication`;
  }

  remove(id: number) {
    return `This action removes a #${id} authentication`;
  }
}
