import { RegisterDto } from "src/modules/authentication/dto/register.dto";
import { UserType } from "../user.type";

export function convertCreateUserDtoToType(createUserDto: RegisterDto): UserType {
    return <UserType>{
        email: createUserDto.email,
        password: createUserDto.password,
        userRole: createUserDto.userRole,
        isEmailVerified: createUserDto.isEmailVerified || false,
        isActive: createUserDto.isActive || true
    };

}
