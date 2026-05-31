import { IsBoolean, IsNotEmpty, IsOptional, IsDateString, IsString, MinLength, MaxLength, Matches } from "class-validator";
import { Types } from "mongoose";

export class CreateProfileDto {
    
    @IsOptional() // Optional for creation, but required for updates
    _id: Types.ObjectId;

    @IsNotEmpty({message: 'userId cannot be empty!'})
    user: Types.ObjectId;

    @IsNotEmpty({message: 'nickname cannot be empty!'})
    @IsString({message: 'nickname must be a string!'})
    @MinLength(3, {message: 'nickname must be at least 3 characters long!'})
    @MaxLength(20, {message: 'nickname cannot exceed 20 characters!'})
    @Matches(/^(?=.{3,20}$)[a-zA-Z0-9._-]+$/, {message: 'nickname can only contain letters, numbers, dots, underscores, and hyphens!'})
    nickname: string;

    @IsOptional()
    avatar: string;

    @IsNotEmpty({message: 'isActive cannot be empty!'})
    @IsBoolean({message: 'isActive is not valid!'})
    isActive: boolean;
}
