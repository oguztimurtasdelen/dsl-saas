import { Controller, Get, Post, Body, Put, Param, Delete, Res, Req, UnauthorizedException, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signing.dto';
import { CreateProfileDto } from '../profile/dto/create-profile.dto';
import { User } from '../user/user.schema';
import { ProfileService } from '../profile/profile.service';
import { Profile } from '../profile/profile.schema';
import { SignUpReturnDto } from './dto/signup-return.dto';
import { ProfileMapper } from '../profile/profile.mapper';
import { Response, Request } from 'express';

@Controller('authentication')
export class AuthenticationController {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly profileService: ProfileService,
  ) {}

  @Post('signup')
  async signup(@Body() signUpDto: SignUpDto) {
    const signedUpUser: User = await this.authenticationService.signUpUser(signUpDto);
    
    return <SignUpReturnDto>{
      success: true,
      message: 'User signed up successfully! Please verify the email.',
      _id: signedUpUser._id,
      email: signedUpUser.email
    };
    
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('signin')
  async signin(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) res: Response
) {
    const result = await this.authenticationService.signInUser(signInDto);
 
    res.cookie('refreshToken', result.refreshToken, {
      httpOnly: true,
      secure: true, // prod
      sameSite: 'strict',
      path: '/authentication/refresh',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });
    // Refresh token has to be secret from the client side.
    delete result.refreshToken;
    return result;
  }

  @Post('refresh')
  async refresh(@Res({ passthrough: true }) res: Response, @Req() req: Request) {
    const token = req.cookies?.refreshToken;
    if (!token) {
      throw new UnauthorizedException();
    }
    return this.authenticationService.refreshToken(token);
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('refreshToken', {
      path: '/authentication/refresh'
    });

    return { success: true };
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
