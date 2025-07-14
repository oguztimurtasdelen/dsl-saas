import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { convertUserDtoToType } from './functions/user.function';
import { JwtAuthGuard } from 'src/customs/validators/jwt-auth.guard';
import { ProfileService } from '../profile/profile.service';
import { User } from './user.schema';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly profileService: ProfileService,
  ) {}

  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

  @Get(':id')
  // To open jwt guard.
  //@UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string) {
    return await this.userService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.update(id, convertUserDtoToType(updateUserDto));
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const _user: User = await this.userService.remove(id);
    await this.profileService.remove(_user.profile.toString());
    return;
  }
}
