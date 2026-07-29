import { IsBoolean, IsEmail, IsEnum, IsInt, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { UserRoleEnum } from '../enums/userrole.enum';
import { UserTypeEnum } from '../enums/usertype.enum';

export class GetUsersQueryDto {
    
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    page?: number;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    limit?: number;

    @IsOptional()
    @IsEmail({}, {message: 'email is not valid!'})
    email: string;

    @IsOptional()
    @IsEnum(UserRoleEnum, {message: 'User Role is not valid!'})
    userRole: string;

    @IsOptional()
    @IsEnum(UserTypeEnum, {message: 'User Type is not valid!'})
    userType: string;

    @IsOptional()
    @IsBoolean({message: 'Email Verification is not valid! '})
    isEmailVerified: boolean;

    @IsOptional()
    @IsBoolean({message: 'isActive value is not valid!'})
    isActive: boolean;
}