import { PartialType } from '@nestjs/mapped-types';
import { RegisterDto } from 'src/modules/authentication/dto/register.dto';

export class UpdateUserDto extends PartialType(RegisterDto) {
    _id: string;
    isEmailVerified: boolean;
    isActive: boolean
}