import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UserprofileService } from '../userprofile/userprofile.service';
import { CreateUserprofileDto } from '../userprofile/dto/create-userprofile.dto';
import { User } from '../user/entities/user.entity';
import { convertCreateUserDtoToType } from "../user/functions/convertDtoToType.function";


@Controller('authentication')
export class AuthenticationController {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly userProfileService : UserprofileService
  ) {}

  @Post('signup')
  async register(@Body() registerDto: RegisterDto) {

    // Call userprofile service here
    
    const registeredUser: User = await this.authenticationService.registerUser(convertCreateUserDtoToType(registerDto));

    let _userProfile: CreateUserprofileDto = <CreateUserprofileDto>{};

    _userProfile.userId = registeredUser.id;
    _userProfile.name = registerDto.name;
    _userProfile.surname = registerDto.surname;

    return this.userProfileService.createUserProfile(_userProfile);
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
