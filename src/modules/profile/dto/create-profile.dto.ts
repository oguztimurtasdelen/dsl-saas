import { IsBoolean, IsDateString, IsEnum, IsNotEmpty } from "class-validator";
import { Types } from "mongoose";
import message from "src/customs/locales/message";
import { UserRole } from "src/customs/userrole.enum";

export class CreateProfileDto {
    @IsNotEmpty({message: 'userId cannot be empty!'})
    userId : Types.ObjectId;

    @IsNotEmpty({message: 'userRole cannot be empty!'})
    @IsEnum(UserRole, {message: 'userRole is not valid!'})
    userRole: UserRole;

    @IsNotEmpty({message: 'name cannot be empty!'})
    name : string;
    
    @IsNotEmpty({message: 'surname cannot be empty!'})
    surname : string;

    @IsNotEmpty({message: 'isActive cannot be empty!'})
    @IsBoolean({message: 'isActive is not valid!'})
    isActive: boolean;
}
