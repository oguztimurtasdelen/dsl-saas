import { IsEnum, IsInt, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { DeviceStatusEnum } from 'src/customs/utils/deviceStatus.enum';

export class GetDevicesQueryDto {
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
    deviceCode?: string;

    @IsOptional()
    deviceName?: string;

    @IsOptional()
    @IsEnum(DeviceStatusEnum, {message: 'Device status is not valid'})
    deviceStatus?: string;

    
}