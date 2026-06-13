import { Types } from "mongoose";
import { User } from "../user/user.schema";
import { CreateProfileDto } from "./dto/create-profile.dto";
import { UpdateProfileDto } from "./dto/update-profile.dto";
import { ProfileType } from "./profile.type";

export class ProfileMapper {
    static convertProfileDtoToType(dto: CreateProfileDto | UpdateProfileDto): ProfileType{
        return<ProfileType>{
            user: dto.user? new Types.ObjectId(dto.user) : dto.user,
            nickname: dto.nickname,
            avatar: dto.avatar,
            isActive: dto.isActive
        };
    }
}