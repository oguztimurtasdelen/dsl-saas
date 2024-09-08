import { IsEmail, IsNotEmpty, IsStrongPassword } from "class-validator";
import message from "src/customs/locales/message";
export class RegisterDto {
    @IsNotEmpty({message: message().validation["name.not.empty"]})
    name: string ;

    @IsNotEmpty({message: message().validation["surname.not.empty"]})
    surname: string;

    @IsNotEmpty({message: message().validation["email.not.empty"]})
    @IsEmail({}, {message: message().validation["email.not.valid"]})
    email: string;

    @IsNotEmpty({message: message().validation["password.not.empty"]})
    @IsStrongPassword({
        minLength: 8,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 0
    }, 
    {message: message().validation["password.not.strong"]})
    password: string;

    @IsNotEmpty({message: message().validation["password.validation.not.empty"]})
    passwordValidation: string;

    isEmailVerified: boolean;
    isActive: boolean;
}
