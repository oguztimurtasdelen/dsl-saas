import { CreateUserProfileDto } from "../dto/create-userprofile.dto";
import { UserProfileType } from "../userprofile.type";

export function convertCreateUserProfileDtoToType(createUserProfileDto: CreateUserProfileDto): UserProfileType {
    return <UserProfileType>{
        _id: null,
        userId: createUserProfileDto.userId,
        name: createUserProfileDto.name,
        surname: createUserProfileDto.surname
    }
}