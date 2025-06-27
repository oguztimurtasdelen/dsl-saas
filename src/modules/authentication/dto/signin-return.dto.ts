import { Types } from "mongoose";
import { Profile } from "src/modules/profile/profile.schema";
import { ProfileType } from "src/modules/profile/profile.type";
import { User } from "src/modules/user/user.schema";

export class SignInReturnDto {
  success: boolean;
  message: string;
  token?: string; // Optional, if you want to return a JWT token or similar
  user?: SignInReturnUserDto 
}

export class SignInReturnUserDto {
  _id: Types.ObjectId;
  name: string;
  surname: string;
  profile: SignInReturnProfileDto;
}

export class SignInReturnProfileDto {
  _id: Types.ObjectId;
  user: Types.ObjectId;
  avatar: string;
  isActive: boolean;
}