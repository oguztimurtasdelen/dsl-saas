import { IsMACAddress, IsNotEmpty, IsEnum } from "class-validator";
import { DeviceStatus } from "src/customs/deviceStatus.enum";

export class CreateDeviceDto {

    @IsNotEmpty({message: "macAddress cannot be empty!"})
    @IsMACAddress({message: "macAddress is not valid!"})
    macAddress : string;

    @IsNotEmpty({message: "deviceCode cannot be empty!"})
    deviceCode: string;

    @IsNotEmpty({message: "deviceName cannot be empty!"})
    deviceName : string;

    @IsNotEmpty({message: "status cannot be empty!"})
    @IsEnum(DeviceStatus, {message: 'status is not valid!'})
    status: DeviceStatus

    description : string;
     
}
