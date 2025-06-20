import { IsMACAddress, IsNotEmpty, IsEnum } from "class-validator";
import { DeviceStatus } from "src/customs/deviceStatus.enum";

export class CreateDeviceDto {

    @IsNotEmpty({message: "MAC Address cannot be empty!"})
    @IsMACAddress({message: "MAC Address is not valid!"})
    macAddress : string;

    @IsNotEmpty({message: "Device Code cannot be empty!"})
    deviceCode: string;

    @IsNotEmpty({message: "Device Name cannot be empty!"})
    deviceName: string;

    @IsNotEmpty({message: "Status cannot be empty!"})
    @IsEnum(DeviceStatus, {message: 'Status is not valid!'})
    status: DeviceStatus

    description : string;
     
}
