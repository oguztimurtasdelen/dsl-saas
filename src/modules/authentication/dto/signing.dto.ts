import { IsEmail, IsNotEmpty } from "class-validator";


export class SignInDto {
    @IsNotEmpty({message: 'Email cannot be empty!'})
    @IsEmail({}, {message: 'Email is not valid!'})
    email: string;

    @IsNotEmpty({message: 'Password cannot be empty!'})
    password: string;

}
