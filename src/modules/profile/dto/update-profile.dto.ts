import { PartialType } from '@nestjs/mapped-types';
import { CreateProfileDto } from './create-profile.dto';
import { IsBoolean, IsDateString, IsNotEmpty, IsOptional, IsPhoneNumber } from 'class-validator';
import message from 'src/customs/locales/message';

export class UpdateProfileDto extends PartialType(CreateProfileDto) {
    @IsNotEmpty({message: '_id cannot be empty!'})
    _id : string;

    @IsOptional()
    @IsDateString({strict: true}, {message: 'birthDate must be in YYYY-MM-DD'})
    birthDate : string;

    @IsOptional()
    avatar : string;

    @IsNotEmpty({message: 'isActive cannot be empty!'})
    @IsBoolean({message: 'isActive is not valid!'})
    isActive: boolean;
}
