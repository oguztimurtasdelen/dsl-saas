import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { User } from '../user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserType } from '../user/user.type';

@Injectable()
export class AuthenticationService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async registerUser(userType: UserType): Promise<User> {
  

    const _user = this.userRepository.create(<User>{
      email: userType.email,
      password: userType.password,
      userRole: userType.userRole,
      isEmailVerified: userType.isEmailVerified,
      isActive: userType.isActive
    });
    
    return await this.userRepository.save(_user);
    
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
