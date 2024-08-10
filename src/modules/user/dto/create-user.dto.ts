import { IsEmail, IsNotEmpty, IsOptional, IsString, IsStrongPassword } from "class-validator";

export class CreateUserDto {
    @IsEmail()
    email: string;
    @IsStrongPassword()
    password: string;
    @IsStrongPassword()
    passwordValidation: string;
    @IsNotEmpty()
    userRole : string;
    @IsNotEmpty()
    name: string ; 
    @IsNotEmpty()
    surname : string;
}
