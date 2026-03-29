import { Types } from "mongoose";
import { Profile } from "src/modules/profile/profile.schema";
import { ProfileType } from "src/modules/profile/profile.type";
import { User } from "src/modules/user/user.schema";

export class SignInReturnDto {
  success: boolean;
  message: string;
  //accessToken?: string; // Optional, if you want to return a JWT token or similar
  //refreshToken?: string; // Optional, if you want to return a refresh token
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