import { FilterQuery, Types } from "mongoose";
import { CreateProfileDto } from "./dto/create-profile.dto";
import { UpdateProfileDto } from "./dto/update-profile.dto";
import { ProfileType } from "./profile.type";
import { GetProfilesQueryDto } from "./dto/get-profiles-query.dto";
import { Profile } from "./profile.schema";

export class ProfileMapper {
    static convertProfileDtoToType(dto: CreateProfileDto | UpdateProfileDto): ProfileType{
        return<ProfileType>{
            user: dto.user? new Types.ObjectId(dto.user) : dto.user,
            nickname: dto.nickname,
            avatar: dto.avatar,
            isActive: dto.isActive
        };
    }

    static getProfileFilterQuery(query: GetProfilesQueryDto): FilterQuery<Profile> {
        const _filter: FilterQuery<Profile> = {
            ...(query.user && { user: new Types.ObjectId(query.user) }),
            ...(query.nickname && { nickname: query.nickname }),
            ...(query.isActive && { isActive: query.isActive }),
        }

        return _filter;
    }
}