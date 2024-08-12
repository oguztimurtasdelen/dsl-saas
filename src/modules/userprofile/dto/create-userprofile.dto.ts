import { IsNotEmpty } from "class-validator";
import message from "src/customs/locales/message";

export class CreateUserprofileDto {
    @IsNotEmpty({message: message().userprofile["id.not.empty"]})
    userId : string;
    @IsNotEmpty({message: message().validation["name.not.empty"]})
    name : string;
    @IsNotEmpty({message: message().validation["surname.not.empty"]})
    surname : string;
    
}
