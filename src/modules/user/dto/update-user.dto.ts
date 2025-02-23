import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { SignUpDto } from 'src/modules/authentication/dto/signup.dto';

export class UpdateUserDto extends PartialType(SignUpDto) {
    @IsNotEmpty()
    _id: string;

    @IsOptional()
    profile: string;
}