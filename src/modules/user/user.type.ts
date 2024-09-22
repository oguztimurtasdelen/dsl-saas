import { UserRole } from "src/customs/userrole.enum";
import { TermsAndConditions } from "./dto/termsAndConditions.dto";

export type UserType = {
  email: string;
  password: string;
  termsAndConditions: TermsAndConditions;
  isEmailVerified: boolean;
  isActive: boolean;
};

