import { Types } from "mongoose";
import { Profile } from "src/modules/profile/profile.schema";
import { User } from "src/modules/user/user.schema";
export class SignInReturnDto {
  success: boolean;
  message: string;
  accessToken?: string; // Optional, if you want to return a JWT token or similar
  refreshToken?: string; // Optional, if you want to return a refresh token
  user?: SignInReturnUserDto 
}

export class SignInReturnUserDto {
  _id: string;
  name: string;
  surname: string;
  profile: SignInReturnProfileDto;
}

export class SignInReturnProfileDto {
  _id: string;
  user: string;
  nickname: string;
  avatar: string;
  isActive: boolean;
}