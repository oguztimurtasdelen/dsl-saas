import { Inject, Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserprofileService } from '../userprofile/userprofile.service';
import { UserprofileModule } from '../userprofile/userprofile.module';
import { CreateUserprofileDto } from '../userprofile/dto/create-userprofile.dto';
@Injectable()
export class UserService {
  @Inject(UserprofileModule)
  private readonly userProfileService: UserprofileService;
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    //private readonly userProfileService: UserprofileService
      
  ){}

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
