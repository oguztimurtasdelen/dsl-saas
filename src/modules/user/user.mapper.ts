import { UserRoleEnum } from "src/modules/user/enums/userrole.enum";
import { SignUpDto } from "../authentication/dto/signup.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserType } from "./user.type";
import { UserTypeEnum } from "src/modules/user/enums/usertype.enum";

export class UserMapper {
    static convertUserDtoToType(dto: SignUpDto | UpdateUserDto): UserType {
        return<UserType>{
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