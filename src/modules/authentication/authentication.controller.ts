import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signing.dto';
import { CreateProfileDto } from '../profile/dto/create-profile.dto';
import { User } from '../user/user.schema';
import { ProfileService } from '../profile/profile.service';
import { Profile } from '../profile/profile.schema';
import { SignUpReturnDto } from './dto/signup-return.dto';
import { ProfileMapper } from '../profile/profile.mapper';


@Controller('authentication')
export class AuthenticationController {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly profileService: ProfileService,
  ) {}

  @Post('signup')
  async signup(@Body() signUpDto: SignUpDto) {
    const signedUpUser: User = await this.authenticationService.signUpUser(signUpDto);

    let profileDto: CreateProfileDto = ProfileMapper.createProfileDto(signedUpUser);
    const signedUpUserProfile: Profile = await this.profileService.createProfile(profileDto);
    
    return <SignUpReturnDto>{
      success: true,
      message: 'User signed up successfully! Please verify the email.'
    };
    
  }

  @Post('signin')
  signin(@Body() signInDto: SignInDto) {
    return this.authenticationService.signInUser(signInDto)
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
