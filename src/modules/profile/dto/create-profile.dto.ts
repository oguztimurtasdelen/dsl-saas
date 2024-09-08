import { IsNotEmpty } from "class-validator";
import { Types } from "mongoose";
import message from "src/customs/locales/message";
import { UserRole } from "src/customs/userrole.enum";

export class CreateProfileDto {
    @IsNotEmpty({message: message().userprofile["id.not.empty"]})
    userId : Types.ObjectId;
    @IsNotEmpty({message: message().validation["name.not.empty"]})
    name : string;
    @IsNotEmpty({message: message().validation["surname.not.empty"]})
    surname : string;
    @IsNotEmpty({message: message().validation["userrole.not.empty"]})
    userRole : UserRole;

    
}
