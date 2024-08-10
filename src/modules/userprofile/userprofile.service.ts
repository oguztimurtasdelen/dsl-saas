import { Injectable } from '@nestjs/common';
import { CreateUserprofileDto } from './dto/create-userprofile.dto';
import { UpdateUserprofileDto } from './dto/update-userprofile.dto';

@Injectable()
export class UserprofileService {
  create(createUserprofileDto: CreateUserprofileDto) {
    return 'This action adds a new userprofile';
  }

  findAll() {
    return `This action returns all userprofile`;
  }

  findOne(id: string) {
    return `This action returns a #${id} userprofile`;
  }

  update(id: string, updateUserprofileDto: UpdateUserprofileDto) {
    return `This action updates a #${id} userprofile`;
  }

  remove(id: string) {
    return `This action removes a #${id} userprofile`;
  }
}
