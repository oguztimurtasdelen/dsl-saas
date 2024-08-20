import { RegisterDto } from "src/modules/authentication/dto/register.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { UserType } from "../user.type";

export function convertCreateUserDtoToType(createUserDto: RegisterDto): UserType {
    const _userType: UserType = <UserType>{};
    _userType._id = null;
    _userType.email = createUserDto.email;
    _userType.password = createUserDto.password;
    _userType.userRole = createUserDto.userRole;
    _userType.isEmailVerified = createUserDto.isEmailVerified || false;
    _userType.isActive = createUserDto.isActive || true;

    return _userType;

}
