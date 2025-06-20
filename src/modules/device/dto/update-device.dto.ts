import { PartialType } from '@nestjs/mapped-types';
import { CreateDeviceDto } from './create-device.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateDeviceDto extends PartialType(CreateDeviceDto) {
    @IsNotEmpty({message: "Device ID cannot be empty!"})
    _id : string;
    
}
