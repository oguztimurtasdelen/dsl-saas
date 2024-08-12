import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { User } from '../user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthenticationService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async registerUser(registerDto: RegisterDto) {
    console.log(registerDto);
    
    const newUser = this.userRepository.create({
      email: registerDto.email,
      password: registerDto.password,
      userRole: registerDto.userRole
    });

    return (await this.userRepository.save(newUser))
    

    return 'This action adds a new authentication';
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
