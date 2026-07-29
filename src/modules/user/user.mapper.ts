import { UserRoleEnum } from "src/modules/user/enums/userrole.enum";
import { SignUpDto } from "../authentication/dto/signup.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserType } from "./user.type";
import { UserTypeEnum } from "src/modules/user/enums/usertype.enum";
import { GetUsersQueryDto } from "./dto/get-users-query.dto";
import { FilterQuery } from "mongoose";
import { User } from "./user.schema";

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

    static getUserFilterQuery(query: GetUsersQueryDto): FilterQuery<User> {
        const _filter: FilterQuery<User> = {
            ...(query.email && { email: query.email }),
            ...(query.userRole && { userRole: query.userRole }),
            ...(query.userType && { userType: query.userType }),
            ...(query.isEmailVerified && { isEmailVerified: query.isEmailVerified }),
            ...(query.isActive && { isActive: query.isActive })
        }
    
        return _filter;
    }
}