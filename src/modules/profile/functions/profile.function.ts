import { UserRoleEnum } from "src/customs/utils/userrole.enum";
import { CreateProfileDto } from "../dto/create-profile.dto";
import { UpdateProfileDto } from "../dto/update-profile.dto";
import { ProfileType } from "../profile.type";
import { User } from "src/modules/user/user.schema";
import { SignUpDto } from "src/modules/authentication/dto/signup.dto";
import { Types } from "mongoose";

export function createProfileDto(_user: User): CreateProfileDto {
    return <CreateProfileDto>{
        _id: _user.profile ? _user.profile._id : new Types.ObjectId(),
        user: _user._id,
        avatar: 'no-avatar.png',
        isActive:  _user.isActive || true,
    };
}

export function convertProfileDtoToType(profileDto: CreateProfileDto | UpdateProfileDto): ProfileType {
    return <ProfileType>{
        _id: profileDto._id,
        user: profileDto.user,
        avatar: profileDto.avatar ? profileDto.avatar : 'no-avatar.png',
        isActive: profileDto.isActive !== undefined ? profileDto.isActive : true,
    }
}