import { Injectable } from '@nestjs/common';
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
    const _device = await this.deviceModel.create(deviceType);

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
