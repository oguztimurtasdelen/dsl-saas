import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signing.dto';
import { CreateProfileDto } from '../profile/dto/create-profile.dto';
import { User } from '../user/user.schema';
import { convertUserDtoToType } from "../user/functions/convertDtoToType.function";
import { ProfileService } from '../profile/profile.service';
import { convertProfileDtoToType } from '../profile/functions/convertDtoToType.function';
import { Profile } from '../profile/profile.schema';
import { UpdateUserDto } from '../user/dto/update-user.dto';
import { UserService } from '../user/user.service';


@Controller('authentication')
export class AuthenticationController {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly profileService: ProfileService,
    private readonly userService: UserService
  ) {}

  @Post('signup')
  async signup(@Body() signUpDto: SignUpDto) {
    
    const signUpUser: User = await this.authenticationService.signUpUser(convertUserDtoToType(signUpDto));

    let profileDto: CreateProfileDto = <CreateProfileDto>{
      user: signUpUser._id,
      userRole: signUpDto.userRole,
      name: signUpDto.name,
      surname: signUpDto.surname
    };

    const signUpUserProfile: Profile = await this.profileService.createProfile(convertProfileDtoToType(profileDto));

    let updateUserDto: UpdateUserDto = <UpdateUserDto>{
      _id: signUpUser._id,
      profile: signUpUserProfile._id
    };

    const updatedUser: User = await this.userService.update(String(signUpUser._id), convertUserDtoToType(updateUserDto))
    
    return {success: true, 
            signUpUser: signUpUser};
    
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
