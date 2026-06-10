import { Controller, Get, Post, Body, Put, Param, Delete, Query, HttpException } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './profile.schema';
import { GetProfilesQueryDto } from './dto/get-profiles-query.dto';
import { GetProfilesQueryReturnDto } from './dto/get-profiles-query-return.dto';

@Controller('profile')
export class ProfileController {
  constructor(private readonly userprofileService: ProfileService) {}

  @Get()
  async findAll(@Query() query: GetProfilesQueryDto): Promise<GetProfilesQueryReturnDto> {
    return await this.userprofileService.findAll(query);
  }

  @Get(':profileId')
  async findOne(@Param('profileId') profileId: string): Promise<Profile> {
    return await this.userprofileService.findOne(profileId);
  }

  @Post()
  async create(@Body() createProfileDto: CreateProfileDto): Promise<Profile> {
    return await this.userprofileService.createProfile(createProfileDto);
  }

  @Put(':profileId')
  async update(@Param('profileId') profileId: string, @Body() updateProfileDto: UpdateProfileDto): Promise<Profile> {
    return await this.userprofileService.update(profileId, updateProfileDto);
  }

  @Delete(':profileId')
  async remove(@Param('profileId') profileId: string): Promise<Profile> {
    return await this.userprofileService.remove(profileId);
  }
}
