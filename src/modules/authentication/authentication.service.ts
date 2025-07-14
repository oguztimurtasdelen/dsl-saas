import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SignInDto } from './dto/signing.dto';
import { User } from '../user/user.schema';
import { UserType } from '../user/user.type';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { SignInReturnDto } from './dto/signin-return.dto';
import { Profile } from '../profile/profile.schema';
import { Document } from "mongoose";


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
    const salt = await this.bcrypt.genSalt(this.saltRounds);
    return await this.bcrypt.hash(openPass, salt);
  }

  // This function takes a plain password and a hashed password and returns a boolean
  async validatePass(plainPass: string, hashedPass: string): Promise<boolean>{
    return await this.bcrypt.compare(plainPass, hashedPass);
  }

  async signUpUser(userType: UserType): Promise<User> {
    // Check if user already exists
    const existingUser = await this.userModel.findOne({ email: userType.email }).exec();
    if (existingUser) {
      throw new HttpException(
        { success: false, message: 'User already exists!' },
        HttpStatus.BAD_REQUEST,
      );
    }
    
    // If user does not exist, create a new user
    userType.password = await this.hashPass(userType.password);
    const _user = await this.userModel.create(userType);
    return _user;
  }

  async signInUser(signInDto: SignInDto) {
    const _user = await this.userModel.findOne({ email: signInDto.email }).populate('profile').lean().exec() as unknown as User & { profile: Profile };
    const isPasswordValid = _user ? await this.validatePass(signInDto.password, _user.password) : false;
    if(!_user || !isPasswordValid) {
      throw new HttpException(
        { success: false, message: 'Invalid password or username!' },
        HttpStatus.UNAUTHORIZED,
      );
    }

    if (!_user.isEmailVerified) {
      throw new HttpException(
        { success: false, message: 'Email is not verified yet!' },
        HttpStatus.UNAUTHORIZED,
      );
    }

    console.log( chalk.bgGreen(_user.email), chalk.green("sign in the system at "), chalk.green(new Date().toLocaleString()) );
    console.log( chalk.bgRed("______________________________________________________________"));

    // Create JWT token
    // The payload can contain any data you want to include in the token
    const payload = {
      userId: _user._id,
      userEmail: _user.email
    };
    const accessToken = this.jwtService.sign(payload);
    return <SignInReturnDto>({
      success: true,
      message: 'User signed in successfully!',
      token: accessToken,
      user: {
        _id: _user._id,
        name: _user.name,
        surname: _user.surname,
        profile: {
          _id: _user.profile._id,
          user: _user.profile.user,
          avatar: _user.profile.avatar,
          isActive: _user.profile.isActive
        }
      }
    });
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
