import { Injectable } from '@nestjs/common';
import { UpdateUserProfileDto } from './dto/update-userprofile.dto';
import { UserProfileType } from './userprofile.type';
import { Userprofile } from './entities/userprofile.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Injectable()
export class UserprofileService {

  constructor(
    @InjectRepository(Userprofile)
    private readonly userProfileRepository: Repository<Userprofile>
  ) {}

  async createUserProfile(userProfileType: UserProfileType): Promise<Userprofile> {
    const _userProfile = this.userProfileRepository.create(<Userprofile>{
      userId: userProfileType.userId,
      name: userProfileType.name,
      surname: userProfileType.surname
    });
    
    
    return await this.userProfileRepository.save(_userProfile);
  }

  findAll() {
    return `This action returns all userprofile`;
  }

  findOne(id: string) {
    return `This action returns a #${id} userprofile`;
  }

  update(id: string, updateUserprofileDto: UpdateUserProfileDto) {
    return `This action updates a #${id} userprofile`;
  }

  remove(id: string) {
    return `This action removes a #${id} userprofile`;
  }
}
