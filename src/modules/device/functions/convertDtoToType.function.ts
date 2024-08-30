import { DeviceType } from "../device.type";
import { CreateDeviceDto } from "../dto/create-device.dto";
import { UpdateDeviceDto } from "../dto/update-device.dto";

export function convertCreateDeviceDtoToType(createDeviceDto: CreateDeviceDto): DeviceType {
    return <DeviceType>{
        macAddress: createDeviceDto.macAddress,
        deviceCode: createDeviceDto.deviceCode,
        deviceName: createDeviceDto.deviceName,
        description: createDeviceDto.description
    }
}

export function convertUpdateDeviceDtoToType(updateDeviceDto: UpdateDeviceDto): DeviceType {
    return <DeviceType>{
        macAddress: updateDeviceDto.macAddress,
        deviceCode: updateDeviceDto.deviceCode,
        deviceName: updateDeviceDto.deviceName,
        description: updateDeviceDto.description
    }
}