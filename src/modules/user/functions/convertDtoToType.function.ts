import { RegisterDto } from "src/modules/authentication/dto/register.dto";
import { UserType } from "../user.type";
import { UserRole } from "src/customs/userrole.enum";
import { TermsAndConditions } from "../dto/termsAndConditions.dto";

export function convertCreateUserDtoToType(createUserDto: RegisterDto): UserType {
    return <UserType>{
        userRole: createUserDto.userRole,
        email: createUserDto.email,
        password: createUserDto.password,
        phoneNumber: createUserDto.phoneNumber,
        isEmailVerified: createUserDto.isEmailVerified || false,
        isPhoneNumberVerified: createUserDto.isPhoneNumberVerified || false,
        termsAndConditions: createUserDto.termsAndConditions || <TermsAndConditions>{},
        isActive: true
    };

}
