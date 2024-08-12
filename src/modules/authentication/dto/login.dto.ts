import { IsEmail, IsNotEmpty } from "class-validator";
import message from "src/customs/locales/message";

export class LoginDto {
    @IsNotEmpty({message: message().validation["name.not.empty"]})
    @IsEmail({}, {message: message().validation["email.not.valid"]})
    email: string;

    @IsNotEmpty({message: message().validation["password.not.empty"]})
    password: string
}
