import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { UserprofileService } from './userprofile.service';
import { CreateUserProfileDto } from './dto/create-userprofile.dto';
import { UpdateUserProfileDto } from './dto/update-userprofile.dto';
import { convertCreateUserProfileDtoToType } from './functions/convertDtoToType.function';

@Controller('userprofile')
export class UserprofileController {
  constructor(private readonly userprofileService: UserprofileService) {}

  @Post()
  async create(@Body() createUserprofileDto: CreateUserProfileDto) {
    return await this.userprofileService.createUserProfile(convertCreateUserProfileDtoToType(createUserprofileDto));
  }

  @Get()
  findAll() {
    return this.userprofileService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userprofileService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserprofileDto: UpdateUserProfileDto) {
    return this.userprofileService.update(id, updateUserprofileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userprofileService.remove(id);
  }
}
