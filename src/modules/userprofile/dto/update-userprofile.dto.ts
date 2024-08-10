import { PartialType } from '@nestjs/mapped-types';
import { CreateUserprofileDto } from './create-userprofile.dto';

export class UpdateUserprofileDto extends PartialType(CreateUserprofileDto) {
    _id : string;
    birthDate : string;
    phoneNumber : string;
    isPhoneNumberVerified : boolean;
    profilePhoto : string;
}
