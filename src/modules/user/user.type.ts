import { UserRole } from "src/customs/userrole.enum";
import { TermsAndConditionsDto } from "./dto/termsAndConditions.dto";

export type UserType = {
  email: string;
  password: string;
  termsAndConditions: TermsAndConditionsDto;
  isEmailVerified: boolean;
  isActive: boolean;
};

