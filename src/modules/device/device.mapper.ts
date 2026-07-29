import { FilterQuery } from "mongoose";
import { DeviceType } from "./device.type";
import { CreateDeviceDto } from "./dto/create-device.dto";
import { GetDevicesQueryDto } from "./dto/get-devices-query.dto";
import { UpdateDeviceDto } from "./dto/update-device.dto";
import { Device } from "./device.schema";

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

    static getDeviceFilterQuery(query: GetDevicesQueryDto): FilterQuery<Device> {
        const _filter: FilterQuery<Device> = {
            ...(query.trainingType && { trainingType: query.trainingType }),
            ...(query.deviceCode && { deviceCode: query.deviceCode }),
            ...(query.deviceName && { deviceName: query.deviceName }),
            ...(query.deviceStatus && { deviceStatus: query.deviceStatus })
        }

        return _filter;
    }
}