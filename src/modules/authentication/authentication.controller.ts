import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { CreateProfileDto } from '../profile/dto/create-profile.dto';
import { User } from '../user/user.schema';
import { convertCreateUserDtoToType } from "../user/functions/convertDtoToType.function";
import { ProfileService } from '../profile/profile.service';
import { convertProfileDtoToType } from '../profile/functions/convertDtoToType.function';
import { Profile } from '../profile/profile.schema';


@Controller('authentication')
export class AuthenticationController {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly profileService: ProfileService
  ) {}

  @Post('signup')
  async register(@Body() registerDto: RegisterDto) {
    
    const registeredUser: User = await this.authenticationService.registerUser(convertCreateUserDtoToType(registerDto));

    let profileDto: CreateProfileDto = <CreateProfileDto>{
      userId: registeredUser._id,
      name: registerDto.name,
      surname: registerDto.surname,
    };

    const registeredUserProfile: Profile = await this.profileService.createProfile(convertProfileDtoToType(profileDto));
    
    return registeredUser;
    
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
