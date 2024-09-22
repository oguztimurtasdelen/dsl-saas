import { IsBoolean, IsDate, IsDateString, IsEmail, IsEnum, IsNotEmpty, IsObject, IsOptional, IsPhoneNumber, IsStrongPassword, Matches, Validate, ValidateNested,  } from "class-validator";
import { Transform, Type } from "class-transformer";
import { UserRole } from "src/customs/userrole.enum";
import { TermsAndConditions } from "src/modules/user/dto/termsAndConditions.dto";
import { IsPasswordValidationMatchConstraint } from "src/customs/validators/isPasswordValidationMatch.validator";

export class RegisterDto {
    @IsNotEmpty({message: 'userRole cannot be empty!'})
    @IsEnum(UserRole, {message: 'userRole is not valid!'})
    userRole: UserRole;

    @IsNotEmpty({message: 'name cannot be empty!'})
    name: string ;

    @IsNotEmpty({message: 'surname cannot be empty!'})
    surname: string;

    @IsNotEmpty({message: 'email cannot be empty!'})
    @IsEmail({}, {message: 'email is not valid!'})
    email: string;

    @IsNotEmpty({message: 'Password cannot be empty!'})
    @IsStrongPassword({
        minLength: 8,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 0
    }, 
    {message: 'password not strong enough! minLength: 8, minUppercase: 1, minNumbers: 1, minSymbols: 0'})
    password: string;

    @IsNotEmpty({message: 'passwordValidation cannot be empty!'})
    @Validate(IsPasswordValidationMatchConstraint, {message: 'passwordValidation is not match with password'})
    passwordValidation: string;

    @ValidateNested()
    @Type(()=> TermsAndConditions)
    @IsObject()
    termsAndConditions: TermsAndConditions;

    @IsOptional()
    @IsBoolean({message: 'isEmailVerified is not valid! '})
    isEmailVerified: boolean;

    @IsOptional()
    @IsBoolean({message: 'isActive is not valid!'})
    isActive: boolean;
}
