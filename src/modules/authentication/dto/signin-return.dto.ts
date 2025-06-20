import { Profile } from "src/modules/profile/profile.schema";
import { User } from "src/modules/user/user.schema";

export class SignInReturnDto {
  success: boolean;
  message: string;
  token?: string; // Optional, if you want to return a JWT token or similar
  user?: User;
}