import { Injectable } from '@nestjs/common';
import { DeviceType } from './device.type';
import { FilterQuery } from 'mongoose';
import { Device } from './device.schema';
import { DeviceMapper } from './device.mapper';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { GetDevicesQueryDto } from './dto/get-devices-query.dto';
import { GetDevicesQueryReturnDto } from './dto/get-devices-query-return.dto';
import { DeviceNotFoundException } from './exceptions/device-not-found.exception';
import { DeviceRepository } from './device.repository';

@Injectable()
export class DeviceService {

  constructor(
    private readonly deviceRepository: DeviceRepository,
  ) {}

  async findAll(query: GetDevicesQueryDto): Promise<GetDevicesQueryReturnDto> {
    const filter: FilterQuery<Device> = DeviceMapper.getDeviceFilterQuery(query);
    const [deviceList, totalDeviceCount]: [Device[], number] = await this.deviceRepository.findAll(query, filter);

    return <GetDevicesQueryReturnDto>{
      devices: deviceList,
      pagination: query,
      total: totalDeviceCount,
      totalPages: Math.ceil(totalDeviceCount / query.limit),
    };
  }

  async findOne(id: string): Promise<Device> {
    const device: Device = await this.deviceRepository.findOne(id);
    if (!device) {
      throw new DeviceNotFoundException();
    }
    return device;
  }

  async create(createDeviceDto: CreateDeviceDto): Promise<Device> {
    const deviceType: DeviceType = DeviceMapper.convertDeviceDtoToType(createDeviceDto);

    return await this.deviceRepository.create(deviceType);
  }

  async update(id: string, updateDeviceDto: UpdateDeviceDto): Promise<Device> {
    const deviceType: DeviceType = DeviceMapper.convertDeviceDtoToType(updateDeviceDto);
    const _device: Device = await this.deviceRepository.update(id, deviceType);

    if (!_device) {
      throw new DeviceNotFoundException();
    }
    return _device;
  }

  async remove(id: string): Promise<Device> {
    const _device: Device = await this.deviceRepository.remove(id);

    if (!_device) {
      throw new DeviceNotFoundException();
    }
    
    return _device;
  }
}
