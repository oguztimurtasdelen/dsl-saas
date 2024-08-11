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
    // Passing to DTO first for creating is returning bad request
    //@IsNotEmpty()
    name: string ; 
    //@IsNotEmpty()
    surname : string;
}
