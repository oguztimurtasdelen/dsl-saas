import { CreateProfileDto } from "../dto/create-profile.dto";
import { UpdateProfileDto } from "../dto/update-profile.dto";
import { ProfileType } from "../profile.type";

export function convertProfileDtoToType(profileDto: CreateProfileDto | UpdateProfileDto): ProfileType {
    return <ProfileType>{
        userId: profileDto.userId,
        name: profileDto.name,
        surname: profileDto.surname,
        birthDate: (profileDto as UpdateProfileDto).birthDate || null,
        profilePhoto: (profileDto as UpdateProfileDto).profilePhoto || null,
        isActive: (profileDto as UpdateProfileDto).isActive || true
    }
}