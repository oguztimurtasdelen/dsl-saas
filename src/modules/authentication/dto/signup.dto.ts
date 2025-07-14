import { IsBoolean, IsDate, IsDateString, IsEmail, IsEnum, IsNotEmpty, IsObject, IsOptional, IsPhoneNumber, IsStrongPassword, Matches, Validate, ValidateNested,  } from "class-validator";
import { Transform, Type } from "class-transformer";
import { UserRoleEnum } from "src/customs/utils/userrole.enum";
import { TermsAndConditionsDto } from "src/modules/user/dto/termsAndConditions.dto";
import { IsPasswordValidationMatchConstraint } from "src/customs/validators/isPasswordValidationMatch.validator";
import { UserTypeEnum } from "src/customs/utils/usertype.enum";

export class SignUpDto {
    @IsNotEmpty({message: 'Name cannot be empty!'})
    name: string ;

    @IsNotEmpty({message: 'Surname cannot be empty!'})
    surname: string;

    @IsNotEmpty({message: 'Email cannot be empty!'})
    @IsEmail({}, {message: 'email is not valid!'})
    email: string;

    //@IsNotEmpty({message: 'Phone Number cannot be empty!'}) // Needed for Two-Way Authentication
    @IsOptional()
    @IsPhoneNumber("TR", {message: 'Phone number is not valid! example: +905555555555'})
    phoneNumber: string;

    @IsNotEmpty({message: 'birthDate cannot be empty!'})
    @IsDateString({}, {message: 'birthDate is not valid!'})
    birthDate: string;

    @IsNotEmpty({message: 'Password cannot be empty!'})
    @IsStrongPassword({
        minLength: 8,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 0
    }, 
    {message: 'Password is not strong enough! minLength: 8, minUppercase: 1, minNumbers: 1, minSymbols: 0'})
    password: string;

    @IsNotEmpty({message: 'Password Validation cannot be empty!'})
    @Validate(IsPasswordValidationMatchConstraint, {message: 'passwordValidation is not match with the password!'})
    passwordValidation: string;

    @IsNotEmpty({message: 'User Role cannot be empty!', })
    @IsEnum(UserRoleEnum, {message: 'User Role is not valid!'})
    userRole: UserRoleEnum;

    @IsNotEmpty({message: 'User Type cannot be empty!'})
    @IsEnum(UserTypeEnum, {message: 'User Type is not valid!'})
    userType: UserTypeEnum;

    @ValidateNested()
    @Type(()=> TermsAndConditionsDto)
    @IsObject()
    termsAndConditions: TermsAndConditionsDto;

    @IsOptional()
    @IsBoolean({message: 'Email Verification is not valid! '})
    isEmailVerified: boolean;

    @IsOptional()
    @IsBoolean({message: 'isActive value is not valid!'})
    isActive: boolean;
}
