import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { User } from '../user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserprofileService } from '../userprofile/userprofile.service';
import { CreateUserprofileDto } from '../userprofile/dto/create-userprofile.dto';
import { UserType } from '../user/user.type';

@Injectable()
export class AuthenticationService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly userProfileService : UserprofileService
  ) {}

  async registerUser(userType: UserType): Promise<User> {
    
      
    // Convert dto to type - User
    // Insert type below
    const _user: User = <User>{};
    _user.email = userType.email;
    const newUser = this.userRepository.create();
    
    return await this.userRepository.save(newUser);
    
  }

  loginUser(loginDto: LoginDto) {
    return `This action works for login authentication`;
  }

  async findAll() {
    console.log(await this.userRepository.find())
    return `This action returns all authentication`;
  }

  findOne(id: number) {
    return `This action returns a #${id} authentication`;
  }

  remove(id: number) {
    return `This action removes a #${id} authentication`;
  }
}
