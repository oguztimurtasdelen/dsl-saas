import { Controller, Get, Post, Body, Put, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './profile.schema';
import { GetProfilesQueryDto } from './dto/get-profiles-query.dto';
import { GetProfilesQueryReturnDto } from './dto/get-profiles-query-return.dto';
import { JwtAuthGuard } from 'src/customs/validators/jwt-auth.guard';
import { CurrentProfileID } from 'src/customs/decorators/current-profileID.decorator';
import { User } from '../user/user.schema';
import { Types } from 'mongoose';
import { JwtCreateProfileGuard } from 'src/customs/validators/jwt-create-profile.guard';


@Controller('profile')
export class ProfileController {
  constructor(private readonly userprofileService: ProfileService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  // Guard for second control will be here by using CurrentProfileID
  async findAll(@Query() query: GetProfilesQueryDto): Promise<GetProfilesQueryReturnDto> {
    return this.userprofileService.findAll(query);
  }
  
  // Guard for second control will be here by using CurrentProfileID + JWT GUARD
  @Get(':profileId')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('profileId') id: string): Promise<Profile> {
    return await this.userprofileService.findOne(id);
  }

  // This function will be called before exactly sign in, we need to define another JWT token and change the guard mechanism. - USER ID second control guard.
  @Post()
  @UseGuards(JwtCreateProfileGuard)
  async create(@Body() createProfileDto: CreateProfileDto): Promise<Profile> {
    return await this.userprofileService.createProfile(createProfileDto);
  }

  // Guard for second control will be here by using CurrentProfileID + JWT GUARD
  @Put(':profileId')
  @UseGuards(JwtAuthGuard)
  async update(@Param('profileId') id: string, @Body() updateProfileDto: UpdateProfileDto): Promise<Profile> {
    return await this.userprofileService.update(id, updateProfileDto);
  }

  // Guard for second control will be here by using CurrentProfileID + JWT GUARD
  @Delete(':profileId')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('profileId') id: string): Promise<Profile> {
    return await this.userprofileService.remove(id);
  }
}
