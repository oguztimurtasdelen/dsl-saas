import { UserRole } from "src/customs/userrole.enum";
import { TermsAndConditions } from "./dto/termsAndConditions.dto";

export type UserType = {
  userRole: UserRole;
  email: string;
  password: string;
  phoneNumber: string;
  isEmailVerified: boolean;
  isPhoneNumberVerified: boolean;
  termsAndConditions: TermsAndConditions;
  isActive: boolean;
};

