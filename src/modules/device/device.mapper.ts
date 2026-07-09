import { DeviceType } from "./device.type";
import { CreateDeviceDto } from "./dto/create-device.dto";
import { UpdateDeviceDto } from "./dto/update-device.dto";

export class DeviceMapper {
    static convertDeviceDtoToType(dto: CreateDeviceDto | UpdateDeviceDto): DeviceType {
        return <DeviceType>{
            macAddress: dto.macAddress,
            trainingType: dto.trainingType,
            deviceCode: dto.deviceCode,
            deviceName: dto.deviceName,
            deviceStatus: dto.deviceStatus,
            firmwareVersion: dto.firmwareVersion,
            description: dto.description
        };
    }
}