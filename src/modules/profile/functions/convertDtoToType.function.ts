import { UserRole } from "src/customs/userrole.enum";
import { CreateProfileDto } from "../dto/create-profile.dto";
import { UpdateProfileDto } from "../dto/update-profile.dto";
import { ProfileType } from "../profile.type";

export function convertProfileDtoToType(profileDto: CreateProfileDto | UpdateProfileDto): ProfileType {
    return <ProfileType>{
        userId: profileDto.userId,
        userRole: profileDto.userRole || UserRole.Athlete,
        name: profileDto.name,
        surname: profileDto.surname,
        birthDate: (profileDto as UpdateProfileDto).birthDate || null,
        avatar: (profileDto as UpdateProfileDto).avatar || null,
        isActive: (profileDto as UpdateProfileDto).isActive || true
    }
}