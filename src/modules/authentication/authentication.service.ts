import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { User } from '../user/user.schema';
import { UserType } from '../user/user.type';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AuthenticationService {
  private bcrypt = require('bcrypt');
  private readonly saltRounds = 10; // Cost Factor to iterate

  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async hashPass(openPass: string): Promise<string>{
    const salt = await this.bcrypt.genSalt(10);
    return await this.bcrypt.hash(openPass, salt);
  }

  async validatePass(plainPass: string, hashedPass: string): Promise<boolean>{
    return await this.bcrypt.compare(plainPass, hashedPass);
  }

  async registerUser(userType: UserType): Promise<User> {
    // this hash create or update can be moved in model via built in pre hook 
    userType.password = await this.hashPass(userType.password);
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

    const isValidPass = await this.validatePass(loginDto.password, user.password);

    if (isValidPass) {
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
