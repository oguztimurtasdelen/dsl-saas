import { CreateProfileDto } from "../dto/create-profile.dto";
import { ProfileType } from "../profile.type";

export function convertCreateProfileDtoToType(createProfileDto: CreateProfileDto): ProfileType {
    return <ProfileType>{
        _id: null,
        userId: createProfileDto.userId,
        name: createProfileDto.name,
        surname: createProfileDto.surname,
        userRole: createProfileDto.userRole
    }
}