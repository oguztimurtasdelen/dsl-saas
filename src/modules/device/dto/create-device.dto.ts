import { IsMACAddress } from "class-validator";

export class CreateDeviceDto {
    @IsMACAddress()
    macAddress : string;
    deviceName : string;
    description : string;
}
