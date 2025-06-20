import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signing.dto';
import { CreateProfileDto } from '../profile/dto/create-profile.dto';
import { User } from '../user/user.schema';
import { convertUserDtoToType } from "../user/functions/user.function";
import { ProfileService } from '../profile/profile.service';
import { convertProfileDtoToType, createProfileDto } from '../profile/functions/profile.function';
import { Profile } from '../profile/profile.schema';
import { UpdateUserDto } from '../user/dto/update-user.dto';
import { UserService } from '../user/user.service';
import { UserType } from '../user/user.type';
import { ProfileType } from '../profile/profile.type';
import { SignUpReturnDto } from './dto/signup-return.dto';


@Controller('authentication')
export class AuthenticationController {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly profileService: ProfileService,
    private readonly userService: UserService
  ) {}

  @Post('signup')
  async signup(@Body() signUpDto: SignUpDto) {
    const userType: UserType = convertUserDtoToType(signUpDto);
    const signedUpUser: User = await this.authenticationService.signUpUser(userType);

    let profileDto: CreateProfileDto = createProfileDto({signUpDto: signUpDto, _user: signedUpUser});
    const profileType: ProfileType = convertProfileDtoToType(profileDto);
    const signedUpUserProfile: Profile = await this.profileService.createProfile(profileType);

    let updateUserDto: UpdateUserDto = <UpdateUserDto>{
      _id: signedUpUser._id,
      profile: signedUpUserProfile._id
    };

    const updatedUser: User = await this.userService.update(String(signedUpUser._id), convertUserDtoToType(updateUserDto))
    
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
