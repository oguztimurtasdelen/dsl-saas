import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { UserprofileService } from './userprofile.service';
import { CreateUserprofileDto } from './dto/create-userprofile.dto';
import { UpdateUserprofileDto } from './dto/update-userprofile.dto';

@Controller('userprofile')
export class UserprofileController {
  constructor(private readonly userprofileService: UserprofileService) {}

  @Post()
  create(@Body() createUserprofileDto: CreateUserprofileDto) {
    return this.userprofileService.createUserProfile(createUserprofileDto);
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
  update(@Param('id') id: string, @Body() updateUserprofileDto: UpdateUserprofileDto) {
    return this.userprofileService.update(id, updateUserprofileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userprofileService.remove(id);
  }
}
