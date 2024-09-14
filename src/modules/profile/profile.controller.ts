import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { convertProfileDtoToType } from './functions/convertDtoToType.function';

@Controller('profile')
export class ProfileController {
  constructor(private readonly userprofileService: ProfileService) {}

  @Post()
  async create(@Body() createProfileDto: CreateProfileDto) {
    return await this.userprofileService.createProfile(convertProfileDtoToType(createProfileDto));
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
  async update(@Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto) {
    return await this.userprofileService.update(id, convertProfileDtoToType(updateProfileDto));
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.userprofileService.remove(id);
  }
}
