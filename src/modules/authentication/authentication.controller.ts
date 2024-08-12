import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('authentication')
export class AuthenticationController {
  constructor(
    private readonly authenticationService: AuthenticationService,
  ) {}

  @Post('signup')
  register(@Body() registerDto: RegisterDto) {

    // Call userprofile service here
    return this.authenticationService.registerUser(registerDto);
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
