import { Types } from "mongoose";
import { Profile } from "src/modules/profile/profile.schema";
import { User } from "src/modules/user/user.schema";
export class SignInReturnDto {
  success: boolean;
  message: string;
  accessToken?: string; // Optional, if you want to return a JWT token or similar
  refreshToken?: string; // Optional, if you want to return a refresh token
  isThereProfile?: boolean; // Optional, to indicate if the user has a profile or not
  profileToken?: string; // Optional, if you want to return a token related to the profile
  user?: SignInReturnUserDto 
}

export class SignInReturnUserDto {
  _id: string;
  name: string;
  surname: string;
  profile?: SignInReturnProfileDto;
}

export class SignInReturnProfileDto {
  _id: string;
  user: string;
  nickname: string;
  avatar: string;
  isActive: boolean;
}