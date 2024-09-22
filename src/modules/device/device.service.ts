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
    const _device = await this.deviceModel.create(<Device>{
      macAddress: deviceType.macAddress,
      deviceCode: deviceType.deviceCode,
      deviceName: deviceType.deviceName,
      description: deviceType.description
    });

    return _device;
  }

  async findAll(): Promise<Device[]> {
    return await this.deviceModel.find().exec();
  }

  async findOne(_id: string): Promise<Device> {
    return await this.deviceModel.findById(_id);
  }

  async update(id: string, deviceType: DeviceType): Promise<Device> {
    return await this.deviceModel.findByIdAndUpdate(
      id, 
      deviceType,
      {
        new: true, // Return updated data
        runValidators: true
      }
    ); 
  }

  async remove(id: string) {
    return await this.deviceModel.findByIdAndDelete(id);
  }
}
