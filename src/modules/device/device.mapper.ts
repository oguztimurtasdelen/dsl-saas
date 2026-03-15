import { DeviceType } from "./device.type";
import { CreateDeviceDto } from "./dto/create-device.dto";
import { UpdateDeviceDto } from "./dto/update-device.dto";

export class DeviceMapper {
    static convertDeviceDtoToType(dto: CreateDeviceDto | UpdateDeviceDto): DeviceType {
        return <DeviceType>{
            macAddress: dto.macAddress,
            deviceCode: dto.deviceCode,
            deviceName: dto.deviceName,
            status: dto.status,
            firmwareVersion: dto.firmwareVersion,
            description: dto.description
        };
    }
}