import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { RegisterDto } from 'src/modules/authentication/dto/register.dto';

export class UpdateUserDto extends PartialType(RegisterDto) {
    @IsNotEmpty()
    _id: string;

    @IsOptional()
    profile: string;
}