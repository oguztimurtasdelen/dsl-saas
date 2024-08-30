import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { CreateUserProfileDto } from '../userprofile/dto/create-userprofile.dto';
import { User } from '../user/user.schema';
import { convertCreateUserDtoToType } from "../user/functions/convertDtoToType.function";
import { UserprofileService } from '../userprofile/userprofile.service';
import { convertCreateUserProfileDtoToType } from '../userprofile/functions/convertDtoToType.function';
import { UserProfile } from '../userprofile/userprofile.schema';


@Controller('authentication')
export class AuthenticationController {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly userProfileService: UserprofileService
  ) {}

  @Post('signup')
  async register(@Body() registerDto: RegisterDto) {

    const registeredUser: User = await this.authenticationService.registerUser(convertCreateUserDtoToType(registerDto));
    
    let userProfileDto: CreateUserProfileDto = <CreateUserProfileDto>{
      userId: registeredUser._id,
      name: registerDto.name,
      surname: registerDto.surname
    };

    const registeredUserProfile: UserProfile = await this.userProfileService.createUserProfile(convertCreateUserProfileDtoToType(userProfileDto));
    
    let v_result = {result: 'SUCCESS',
                    userId: registeredUser._id,
                    userName: registeredUserProfile.name,
                    userSurname: registeredUserProfile.surname
                   };
    return v_result;
    
  }

  @Post('signin')
  login(@Body() loginDto: LoginDto) {
    return this.authenticationService.loginUser(loginDto)
  }

  @Get()
  findAll() {
    return this.authenticationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authenticationService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authenticationService.remove(+id);
  }
}
