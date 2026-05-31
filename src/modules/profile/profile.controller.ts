import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Controller('profile')
export class ProfileController {
  constructor(private readonly userprofileService: ProfileService) {}

  @Post()
  async create(@Body() createProfileDto: CreateProfileDto) {
    return await this.userprofileService.createProfile(createProfileDto);
  }

  @Get()
  async findAll() {
    return await this.userprofileService.findAll();
  }

  @Get(':profileId')
  async findOne(@Param('profileId') profileId: string) {
    return await this.userprofileService.findOne(profileId);
  }

  @Put(':profileId')
  async update(@Param('profileId') profileId: string, @Body() updateProfileDto: UpdateProfileDto) {
    return await this.userprofileService.update(profileId, updateProfileDto);
  }

  @Delete(':profileId')
  async remove(@Param('profileId') profileId: string) {
    return await this.userprofileService.remove(profileId);
  }
}
