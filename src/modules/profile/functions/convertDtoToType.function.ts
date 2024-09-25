import { UserRole } from "src/customs/userrole.enum";
import { CreateProfileDto } from "../dto/create-profile.dto";
import { UpdateProfileDto } from "../dto/update-profile.dto";
import { ProfileType } from "../profile.type";

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