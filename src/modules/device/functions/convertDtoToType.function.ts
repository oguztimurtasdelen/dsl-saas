import { DeviceType } from "../device.type";
import { CreateDeviceDto } from "../dto/create-device.dto";
import { UpdateDeviceDto } from "../dto/update-device.dto";

export function convertDeviceDtoToType(createDeviceDto: CreateDeviceDto | UpdateDeviceDto): DeviceType {
    return <DeviceType>{
        macAddress: createDeviceDto.macAddress,
        deviceCode: createDeviceDto.deviceCode,
        deviceName: createDeviceDto.deviceName,
        description: createDeviceDto.description
    }
}
