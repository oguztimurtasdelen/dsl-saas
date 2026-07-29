import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, Types } from 'mongoose';
import { User } from './user.schema';
import { UserType } from './user.type';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetUsersQueryReturnDto } from './dto/get-users-query-return.dto';
import { UserMapper } from './user.mapper';
import { GetUsersQueryDto } from './dto/get-users-query.dto';
import { UserNotFoundException } from './exceptions/user-not-found.exception';
import { UserRepository } from './user.repository';
import { SignUpDto } from '../authentication/dto/signup.dto';


@Injectable()
export class UserService {

  constructor(
    private readonly userRepository: UserRepository,
  ) {}

  async findAll(query: GetUsersQueryDto): Promise<GetUsersQueryReturnDto> {
    const filter: FilterQuery<User> = UserMapper.getUserFilterQuery(query);
    const [userList, totalUserCount]: [User[], number] = await this.userRepository.findAll(query, filter);

    return <GetUsersQueryReturnDto>{
      users: userList,
      pagination: query,
      total: totalUserCount,
      totalPages: Math.ceil(totalUserCount / query.limit)
    };

  }

  async findOne(id: string): Promise<User> {
    const user: User = await this.userRepository.findOne(id);

    if (!user) {
      throw new UserNotFoundException();
    }
    return user;
  }

  findOneByEmail(email: string): Promise<User> {
    return this.userRepository.findOneByEmail(email);
  }

  async create(signUpDto: SignUpDto): Promise<User> {
    const userType: UserType = UserMapper.convertUserDtoToType(signUpDto);
    
    return this.userRepository.create(userType);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const userType: UserType = UserMapper.convertUserDtoToType(updateUserDto);
    const user: User = await this.userRepository.update(id, userType);

    if (!user) {
      throw new UserNotFoundException();
    }
    return user;
  }

  async remove(id: string) {
    const user: User = await this.userRepository.remove(id);

    if (!user) {
      throw new UserNotFoundException();
    }
    return user;
  }
}
