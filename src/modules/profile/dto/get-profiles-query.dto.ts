import { IsBoolean, IsInt, IsOptional, IsString, Matches, MaxLength, Min, MinLength } from 'class-validator';
import { Type } from 'class-transformer';

export class GetProfilesQueryDto {
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    page?: number;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    limit?: number;

    @IsOptional()
    user: string;

    @IsOptional()
    @IsString({message: 'nickname must be a string!'})
    @MinLength(3, {message: 'nickname must be at least 3 characters long!'})
    @MaxLength(20, {message: 'nickname cannot exceed 20 characters!'})
    @Matches(/^(?=.{3,20}$)[a-zA-Z0-9._-]+$/, {message: 'nickname can only contain letters, numbers, dots, underscores, and hyphens!'})
    nickname: string;

    @IsOptional()
    @IsBoolean()
    isActive: boolean;

}
