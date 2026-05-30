import { Types } from "mongoose";
import { User } from "../user/user.schema";
import { CreateProfileDto } from "./dto/create-profile.dto";
import { UpdateProfileDto } from "./dto/update-profile.dto";
import { ProfileType } from "./profile.type";

export class ProfileMapper {
    static createProfileDto(_user: User): CreateProfileDto{
        return<CreateProfileDto>{
            _id: null, // MongoDB will generate this automatically
            user: _user._id,
            avatar: null,
            isActive: _user.isActive || true
        }
    };

    static convertProfileDtoToType(dto: CreateProfileDto | UpdateProfileDto): ProfileType{
        return<ProfileType>{
            _id: dto._id,
            user: dto.user,
            avatar: dto.avatar,
            isActive: dto.isActive
        };
    }
}