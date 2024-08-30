import { Injectable } from '@nestjs/common';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { DeviceType } from './device.type';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Device } from './device.schema';

@Injectable()
export class DeviceService {

  constructor(
    @InjectModel(Device.name)
    private readonly deviceModel: Model<Device>
  ) {}

  async create(deviceType: DeviceType): Promise<Device> {

    const _device = new this.deviceModel(deviceType);
    return await _device.save();
    /*
    const _device = this.deviceRepository.create(<Device>{
      macAddress: deviceType.macAddress,
      deviceCode: deviceType.deviceCode,
      deviceName: deviceType.deviceName,
      description: deviceType.description
    });
    return await this.deviceRepository.save(_device);
    */
  }

  findAll(): String {
    return `This action returns all device`;
  }

  findOne(_id: string): String {
    return `This action returns a #${_id} device`;
  }

  update(id: string, updateDeviceDto: UpdateDeviceDto) {
    return `This action updates a #${id} device`;
  }

  remove(id: string) {
    return `This action removes a #${id} device`;
  }
}
