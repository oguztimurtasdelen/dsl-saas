import { RegisterDto } from "src/modules/authentication/dto/register.dto";
import { UserType } from "../user.type";
import { UserRole } from "src/customs/userrole.enum";
import { TermsAndConditions } from "../dto/termsAndConditions.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { Types } from "mongoose";

export function convertUserDtoToType(userDto: RegisterDto | UpdateUserDto): UserType {
    return <UserType>{
        _id: (userDto as UpdateUserDto)._id,
        email: userDto.email,
        password: userDto.password,
        termsAndConditions: userDto.termsAndConditions || null,
        isEmailVerified: userDto.isEmailVerified || false,
        isActive: userDto.isActive || true,
        profile: new Types.ObjectId( (userDto as UpdateUserDto).profile ) || null
    };

}
