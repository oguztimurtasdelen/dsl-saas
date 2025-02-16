import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { User } from '../user/user.schema';
import { UserType } from '../user/user.type';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';

const chalk = require('chalk');

@Injectable()
export class AuthenticationService {
  private bcrypt = require('bcrypt');
  private readonly saltRounds = 10; // Cost Factor to iterate

  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private readonly jwtService: JwtService
  ) {}

  // This function takes a string and returns a hashed string
  async hashPass(openPass: string): Promise<string>{
    const salt = await this.bcrypt.genSalt(10);
    return await this.bcrypt.hash(openPass, salt);
  }

  // This function takes a plain password and a hashed password and returns a boolean
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
      console.log( chalk.bgGreen(user.email), chalk.green("login the system."));
      console.log( chalk.bgRed("______________________________________________________________"));
      const payload = {
        userId: user._id,
        profileId: user.profile,
        useremail: user.email
      };
      
      return {
        success: true,
        access_token: this.jwtService.sign(payload)
      }
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
