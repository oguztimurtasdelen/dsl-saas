import { SignUpDto } from "src/modules/authentication/dto/signup.dto";
import { UserType } from "../user.type";
import { UserRoleEnum } from "src/customs/utils/userrole.enum";
import { UserTypeEnum } from "src/customs/utils/usertype.enum";
import { UpdateUserDto } from "../dto/update-user.dto";
import { Types } from "mongoose";


export function convertUserDtoToType(userDto: SignUpDto | UpdateUserDto): UserType {
    
    return <UserType>{
        _id: (userDto as UpdateUserDto)._id ? (userDto as UpdateUserDto)._id : new Types.ObjectId(),
        profile: (userDto as UpdateUserDto).profile ? (userDto as UpdateUserDto).profile : new Types.ObjectId(),
        email: userDto.email,
        password: userDto.password,
        userRole: UserRoleEnum[userDto.userRole],
        userType: UserTypeEnum[userDto.userType],
        name: userDto.name,
        surname: userDto.surname,
        birthDate: userDto.birthDate,
        phoneNumber: userDto.phoneNumber,
        termsAndConditions: userDto.termsAndConditions,
        isEmailVerified: userDto.isEmailVerified ? userDto.isEmailVerified : false,
        isActive: userDto.isActive ? userDto.isActive : true
    };

}


