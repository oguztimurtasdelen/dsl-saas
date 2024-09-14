import { IsBoolean, IsDateString, IsNotEmpty } from "class-validator";
import { Types } from "mongoose";
import message from "src/customs/locales/message";
import { UserRole } from "src/customs/userrole.enum";

export class CreateProfileDto {
    @IsNotEmpty({message: 'userId cannot be empty!'})
    userId : Types.ObjectId;

    @IsNotEmpty({message: 'name cannot be empty!'})
    name : string;
    
    @IsNotEmpty({message: 'surname cannot be empty!'})
    surname : string;
}
