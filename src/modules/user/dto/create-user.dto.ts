import { IsEmail, IsNotEmpty, IsStrongPassword } from "class-validator";

export class CreateUserDto {
    @IsEmail()
    email: string;
    @IsStrongPassword()
    password: string;
    @IsStrongPassword()
    passwordValidation: string;
    @IsNotEmpty()
    name : string;
    @IsNotEmpty()
    surname : string;
}
