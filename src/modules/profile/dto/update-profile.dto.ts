import { PartialType } from '@nestjs/mapped-types';
import { CreateProfileDto } from './create-profile.dto';
import { IsDateString, IsNotEmpty, IsPhoneNumber } from 'class-validator';
import message from 'src/customs/locales/message';

export class UpdateProfileDto extends PartialType(CreateProfileDto) {
    @IsNotEmpty({message: message().userprofile['id.not.empty']})
    _id : string;
    @IsNotEmpty({message: message().userprofile['birthdate.not.empty']})
    @IsDateString({}, {message: message().userprofile['birthdate.not.valid']})
    birthDate : string;
    @IsPhoneNumber(null, {message: message().userprofile['phonenumber.not.valid']})
    phoneNumber : string;
    isPhoneNumberVerified : boolean;
    profilePhoto : string;
}
