import { IsMACAddress, IsNotEmpty, IsEnum, IsOptional } from "class-validator";
import { DeviceStatusEnum } from "../enums/deviceStatus.enum";
import { TrainingTypeEnum } from "../../training/enums/trainingType.enum";

export class CreateDeviceDto {

    @IsNotEmpty({message: "MAC Address cannot be empty!"})
    @IsMACAddress({message: "MAC Address is not valid!"})
    macAddress : string;

    @IsNotEmpty({message: "Training type cannot be empty!"})
    @IsEnum(TrainingTypeEnum, {message: 'Training type is not valid!'})
    trainingType: TrainingTypeEnum;

    //To-Do: Will be converted to enum as sportif performance map
    @IsNotEmpty({message: "Device Code cannot be empty!"})
    deviceCode: string;

    @IsNotEmpty({message: "Device Name cannot be empty!"})
    deviceName: string;

    @IsNotEmpty({message: "Status cannot be empty!"})
    @IsEnum(DeviceStatusEnum, {message: 'Status is not valid!'})
    deviceStatus: DeviceStatusEnum

    @IsOptional()
    firmwareVersion: string;

    @IsOptional()
    description : string;
     
}