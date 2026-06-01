import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SignInDto } from './dto/signing.dto';
import { User } from '../user/user.schema';
import { UserType } from '../user/user.type';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { SignInReturnDto } from './dto/signin-return.dto';
import { Profile } from '../profile/profile.schema';
import { Document } from "mongoose";
import { SignUpDto } from './dto/signup.dto';
import { UserMapper } from '../user/user.mapper';
import { UserService } from '../user/user.service';
import { ProfileService } from '../profile/profile.service';
import { IAccessTokenPayload } from 'src/customs/interfaces/accessTokenPayload.interface';


const chalk = require('chalk');

@Injectable()
export class AuthenticationService {
  private bcryptjs = require('bcryptjs');
  private readonly saltRounds = 10; // Cost Factor to iterate

  constructor(
    private readonly userService: UserService,
    private readonly profileService: ProfileService,
    private readonly jwtService: JwtService
  ) {}

  // This function takes a string and returns a hashed string
  async hashPass(openPass: string): Promise<string>{
    const salt = await this.bcryptjs.genSalt(this.saltRounds);
    return await this.bcryptjs.hash(openPass, salt);
  }

  // This function takes a plain password and a hashed password and returns a boolean
  async validatePass(plainPass: string, hashedPass: string): Promise<boolean>{
    return await this.bcryptjs.compare(plainPass, hashedPass);
  }

  // ✅ NEW
  generateAccessToken(payload: any): string {
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_ACCESS_TOKEN_SECRET_KEY,
      expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN,
      issuer: 'dsl-saas',
      audience: 'dsl-ionic-app-user',
      jwtid: crypto.randomUUID()
    });
  }

  // ✅ NEW
  generateRefreshToken(payload: IAccessTokenPayload): string {
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_TOKEN_SECRET_KEY,
      expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN,
      issuer: 'dsl-saas',
      audience: 'dsl-ionic-app-user',
      jwtid: crypto.randomUUID()
    });
  }

  // NEW
  verifyRefreshToken(token: string) {
    try {
      return this.jwtService.verify(token, {
        secret: process.env.JWT_REFRESH_TOKEN_SECRET_KEY,
      });
    } catch (e) {
      throw new HttpException(
        { success: false, message: 'Invalid refresh token' },
        HttpStatus.UNAUTHORIZED
      );
    }
  }

  // NEW
  async refreshToken(token: string) {
    const payload = this.verifyRefreshToken(token);
    const newAccessToken = this.generateAccessToken({
      sub: payload.sub
    });
    console.log('refreshed token payload', this.jwtService.decode(newAccessToken));

    // TODO REFRESH TOKEN SONRASI HOME PAGE'E GİDİYOR SAYFADA KALM
    return newAccessToken
  }

  async signUpUser(signUpDto: SignUpDto): Promise<User> {
    // Convert dto to type
    const userType: UserType = UserMapper.convertUserDtoToType(signUpDto);

    // Check if user already exists
    //const existingUser = await this.userModel.findOne({ email: userType.email }).exec();
    const existingUser = await this.userService.findOneByEmail(userType.email);
    if (existingUser) {
      throw new HttpException(
        { success: false, message: 'E-mail already exists!' },
        HttpStatus.BAD_REQUEST,
      );
    }
    
    // If user does not exist, create a new user
    userType.password = await this.hashPass(userType.password); // Hash the password before saving
    //const _user = await this.userModel.create(userType);
    const _user = await this.userService.create(userType);
    return _user;
  }

  async signInUser(signInDto: SignInDto) {
    const _user: User = await this.userService.findOneByEmail(signInDto.email);
    const _profile: Profile = await this.profileService.findOneByUserId(_user._id);

    console.log("_user: ", _user);
    console.log("_profile: ", _profile);
    
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


    console.log('mustafa1', _user);
    // Create JWT token
    // The payload can contain any data you want to include in the token
    const payload: IAccessTokenPayload = {
      sub: _profile._id.toString()
    };

    const accessToken = this.generateAccessToken(payload);
    const refreshToken = this.generateRefreshToken(payload);
    
    console.log('payload',this.jwtService.decode(accessToken));

    console.log( chalk.bgYellow(_user.email), chalk.yellow("with access token "), chalk.yellow(accessToken) );
    console.log( chalk.bgBlue(_user.email), chalk.yellow("with refresh token "), chalk.blue(refreshToken) );

    return <SignInReturnDto>({
      success: true,
      message: 'User signed in successfully!',
      accessToken: accessToken,
      refreshToken: refreshToken,
      user: {
        _id: _user._id.toString(),
        name: _user.name,
        surname: _user.surname,
        profile: {
          _id: _profile._id.toString(),
          user: _profile.user.toString(),
          nickname: _profile.nickname,
          avatar: _profile.avatar,
          isActive: _profile.isActive
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
