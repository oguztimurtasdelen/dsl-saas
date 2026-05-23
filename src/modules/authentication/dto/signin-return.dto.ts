import { Types } from "mongoose";
export class SignInReturnDto {
  success: boolean;
  message: string;
  accessToken?: string; // Optional, if you want to return a JWT token or similar
  refreshToken?: string; // Optional, if you want to return a refresh token
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
}