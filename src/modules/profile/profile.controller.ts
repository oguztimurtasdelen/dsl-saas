import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { convertCreateProfileDtoToType } from './functions/convertDtoToType.function';

@Controller('userprofile')
export class ProfileController {
  constructor(private readonly userprofileService: ProfileService) {}

  @Post()
  async create(@Body() createUserprofileDto: CreateProfileDto) {
    return await this.userprofileService.createProfile(convertCreateProfileDtoToType(createUserprofileDto));
  }

  @Get()
  async findAll() {
    return await this.userprofileService.findAll();
  }

  @Get(':userId')
  async findOne(@Param('userId') userId: string) {
    return await this.userprofileService.findOne(userId);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserprofileDto: UpdateProfileDto) {
    return this.userprofileService.update(id, updateUserprofileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userprofileService.remove(id);
  }
}
