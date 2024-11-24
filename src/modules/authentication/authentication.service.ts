import { Injectable } from '@nestjs/common';
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
    console.log('logindto pass', loginDto.password)

    const user = await this.userModel.findOne({email: loginDto.email}).exec();
    console.log('user-pass from db', user.password)
    if(!user) {
      console.log('test user bulamadım')
      return {success: false};
    }
    //const isValid = await bcrypt.compare(loginDto.password, user.password);
    if (loginDto.password = user.password ) {
      console.log('test user bıldum pass doğru')

      return {success: true}
    }else {
      return {success: false}
      console.log('test user bıldum pass yanlış')
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
