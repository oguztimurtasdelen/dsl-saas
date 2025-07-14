import { SignUpDto } from "src/modules/authentication/dto/signup.dto";
import { UserType } from "../user.type";
import { UserRoleEnum } from "src/customs/utils/userrole.enum";
import { UserTypeEnum } from "src/customs/utils/usertype.enum";
import { UpdateUserDto } from "../dto/update-user.dto";
import { Types } from "mongoose";


export function convertUserDtoToType(userDto: SignUpDto | UpdateUserDto): UserType {
    
    return <UserType>{
        profile: (userDto as UpdateUserDto).profile,
        email: userDto.email,
        password: userDto.password,
        userRole: UserRoleEnum[userDto.userRole],
        userType: UserTypeEnum[userDto.userType],
        name: userDto.name,
        surname: userDto.surname,
        birthDate: userDto.birthDate,
        phoneNumber: userDto.phoneNumber,
        termsAndConditions: userDto.termsAndConditions,
        isEmailVerified: userDto.isEmailVerified,           
        isActive: userDto.isActive
    };

}


