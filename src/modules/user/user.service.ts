import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
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
  
  async createUser(createUserDto: CreateUserDto) {
    const newUser = new this.userModel(createUserDto);
    const savedUser = await newUser.save();
    console.log("Service-User: createUserDto")
    console.log(createUserDto)
    console.log("Service-User: savedUser")
    
    // TODO the craete user _id needs to return to call service for profile creating
    /*æß
    const createUserProfileDto = new CreateUserprofileDto();
    this.userProfileService.createUserProfile(createUserProfileDto, savedUser._id)
    */
    return null;
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: string) {
    return `This action returns a #${id} user`;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
