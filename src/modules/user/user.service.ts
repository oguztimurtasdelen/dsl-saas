import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: string) {
    return `This action returns a #${id} user`;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
