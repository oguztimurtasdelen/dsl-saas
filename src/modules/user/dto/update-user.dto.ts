import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { Types } from 'mongoose';
import { SignUpDto } from 'src/modules/authentication/dto/signup.dto';

export class UpdateUserDto extends PartialType(SignUpDto) {
    @IsNotEmpty({message: 'id cannot be empty!'})
    _id: Types.ObjectId;
}