import { UserRoleEnum } from "src/modules/user/enums/userrole.enum";
import { TermsAndConditionsDto } from "./dto/termsAndConditions.dto";
import { Types } from "mongoose";
import { UserTypeEnum } from "src/modules/user/enums/usertype.enum";


export type UserType = {
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
