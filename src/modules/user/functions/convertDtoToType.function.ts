import { RegisterDto } from "src/modules/authentication/dto/register.dto";
import { UserType } from "../user.type";
import { UserRole } from "src/customs/userrole.enum";
import { TermsAndConditions } from "../dto/termsAndConditions.dto";

export function convertCreateUserDtoToType(createUserDto: RegisterDto): UserType {
    return <UserType>{
        email: createUserDto.email,
        password: createUserDto.password,
        termsAndConditions: createUserDto.termsAndConditions || <TermsAndConditions>{},
        isEmailVerified: createUserDto.isEmailVerified || false,
        isActive: true
    };

}
