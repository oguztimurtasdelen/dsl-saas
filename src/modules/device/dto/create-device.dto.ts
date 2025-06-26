import { IsMACAddress, IsNotEmpty, IsEnum } from "class-validator";
import { DeviceStatusEnum } from "src/customs/utils/deviceStatus.enum";

export class CreateDeviceDto {

    @IsNotEmpty({message: "MAC Address cannot be empty!"})
    @IsMACAddress({message: "MAC Address is not valid!"})
    macAddress : string;

    @IsNotEmpty({message: "Device Code cannot be empty!"})
    deviceCode: string;

    @IsNotEmpty({message: "Device Name cannot be empty!"})
    deviceName: string;

    @IsNotEmpty({message: "Status cannot be empty!"})
    @IsEnum(DeviceStatusEnum, {message: 'Status is not valid!'})
    status: DeviceStatusEnum

    description : string;
     
}
