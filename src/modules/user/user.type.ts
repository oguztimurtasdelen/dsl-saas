import { UserRoleEnum } from "src/customs/utils/userrole.enum";
import { TermsAndConditionsDto } from "./dto/termsAndConditions.dto";
import { Types } from "mongoose";
import { UserTypeEnum } from "src/customs/utils/usertype.enum";
import { Profile } from "../profile/profile.schema";
import { User } from "./user.schema";

export type UserType = {
  _id: Types.ObjectId;
  profile: Types.ObjectId;
  email: string;
  password: string;
  userRole: UserRoleEnum;
  userType: UserTypeEnum;
  name: string;
  surname: string;
  birthDate: string;
  phoneNumber: string;
  termsAndConditions: TermsAndConditionsDto;
  isEmailVerified: boolean;
  isActive: boolean;
};

export type UserWithProfileType  = User & {
  profile:  Profile;
}
