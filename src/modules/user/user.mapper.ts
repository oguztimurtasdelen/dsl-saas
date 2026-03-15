import { UserRoleEnum } from "src/customs/utils/userrole.enum";
import { SignUpDto } from "../authentication/dto/signup.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserType } from "./user.type";
import { UserTypeEnum } from "src/customs/utils/usertype.enum";

export class UserMapper {
    static convertUserDtoToType(dto: SignUpDto | UpdateUserDto): UserType {
        return<UserType>{
            profile: (dto as UpdateUserDto).profile,
            email: dto.email,
            password: dto.password,
            userRole: UserRoleEnum[dto.userRole],
            userType: UserTypeEnum[dto.userType],
            name: dto.name,
            surname: dto.surname,
            birthDate: dto.birthDate,
            phoneNumber: dto.phoneNumber,
            termsAndConditions: dto.termsAndConditions,
            isEmailVerified: dto.isEmailVerified,
            isActive: dto.isActive
        };
    }
}