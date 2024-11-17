import { DeviceType } from "../device.type";
import { CreateDeviceDto } from "../dto/create-device.dto";
import { UpdateDeviceDto } from "../dto/update-device.dto";

export function convertDeviceDtoToType(deviceDto: CreateDeviceDto | UpdateDeviceDto): DeviceType {
    return <DeviceType>{
        macAddress: deviceDto.macAddress,
        deviceCode: deviceDto.deviceCode,
        deviceName: deviceDto.deviceName,
        status: deviceDto.status,
        description: deviceDto.description
    }
}
