import { DeviceType } from "../device.type";
import { CreateDeviceDto } from "../dto/create-device.dto";

export function convertCreateDeviceDtoToType(createDeviceDto: CreateDeviceDto): DeviceType {
    return <DeviceType>{
        //_id: null,
        macAddress: createDeviceDto.macAddress,
        deviceCode: createDeviceDto.deviceCode,
        deviceName: createDeviceDto.deviceName,
        description: createDeviceDto.description
    }
}