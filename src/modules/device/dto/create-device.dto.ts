import { IsMACAddress, IsNotEmpty } from "class-validator";
import message from "src/customs/locales/message";

export class CreateDeviceDto {
    @IsNotEmpty({message: message().device["macaddress.not.empty"]})
    @IsMACAddress({message: message().device["macaddress.not.valid"]})
    macAddress : string;
    @IsNotEmpty({message: message().device["code.not.empty"]})
    deviceCode: string;
    @IsNotEmpty({message: message().device["name.not.empty"]})
    deviceName : string;
    description : string;
}
