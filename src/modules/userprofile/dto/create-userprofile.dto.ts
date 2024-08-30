import { IsNotEmpty } from "class-validator";
import { Types } from "mongoose";
import message from "src/customs/locales/message";

export class CreateUserProfileDto {
    @IsNotEmpty({message: message().userprofile["id.not.empty"]})
    userId : Types.ObjectId;
    @IsNotEmpty({message: message().validation["name.not.empty"]})
    name : string;
    @IsNotEmpty({message: message().validation["surname.not.empty"]})
    surname : string;
    
}
