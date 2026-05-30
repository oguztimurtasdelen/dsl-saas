import { IsBoolean, IsNotEmpty, IsOptional, IsDateString } from "class-validator";
import { Types } from "mongoose";

export class CreateProfileDto {
    
    @IsOptional() // Optional for creation, but required for updates
    _id: Types.ObjectId;

    @IsNotEmpty({message: 'userId cannot be empty!'})
    user: Types.ObjectId;

    @IsOptional()
    avatar: string;

    @IsNotEmpty({message: 'isActive cannot be empty!'})
    @IsBoolean({message: 'isActive is not valid!'})
    isActive: boolean;
}
