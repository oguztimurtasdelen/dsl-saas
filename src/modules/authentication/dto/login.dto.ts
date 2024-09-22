import { IsEmail, IsEnum, IsNotEmpty } from "class-validator";
import { UserRole } from "src/customs/userrole.enum";


export class LoginDto {
    @IsNotEmpty({message: 'email cannot be empty!'})
    @IsEmail({}, {message: 'email is not valid!'})
    email: string;

    @IsNotEmpty({message: 'password cannot be empty!'})
    password: string;

}
