import { UserRole } from "src/customs/userrole.enum";
import { CreateProfileDto } from "../dto/create-profile.dto";
import { UpdateProfileDto } from "../dto/update-profile.dto";
import { ProfileType } from "../profile.type";
import { User } from "src/modules/user/user.schema";
import { SignUpDto } from "src/modules/authentication/dto/signup.dto";

export function convertProfileDtoToType(profileDto: CreateProfileDto | UpdateProfileDto): ProfileType {
    return <ProfileType>{
        user: profileDto.user,
        userRole: profileDto.userRole,
        name: profileDto.name,
        surname: profileDto.surname,
        birthDate: (profileDto as UpdateProfileDto).birthDate,
        avatar: (profileDto as UpdateProfileDto).avatar,
        isActive: (profileDto as UpdateProfileDto).isActive
    }
}

export function createProfileDto(data: {signUpDto: SignUpDto, _user: User}): CreateProfileDto {
    return <CreateProfileDto>{
        user: data._user._id,
        userRole: UserRole[data.signUpDto.userRole],
        name: data.signUpDto.name,
        surname: data.signUpDto.surname,
        birthDate: data.signUpDto.birthDate,
        avatar: data.signUpDto.avatar,
        isActive: data.signUpDto.isActive
    };
}