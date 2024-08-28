import { Injectable } from '@nestjs/common';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { DeviceType } from './device.type';
import { Device } from './entities/device.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class DeviceService {

  constructor(
    @InjectRepository(Device)
    private readonly deviceRepository: Repository<Device>
  ) {}

  async create(deviceType: DeviceType): Promise<Device> {
    const _device = this.deviceRepository.create(<Device>{
      macAddress: deviceType.macAddress,
      deviceCode: deviceType.deviceCode,
      deviceName: deviceType.deviceName,
      description: deviceType.description
    });
    return await this.deviceRepository.save(_device);
  }

  async findAll(): Promise<Device[]> {
    return this.deviceRepository.find();
  }

  async findOne(_id: string): Promise<Device |String> {
    console.log(_id)
    //const _device = await this.deviceRepository.findOneBy({_id});
    
    return '_device'
  }

  update(id: string, updateDeviceDto: UpdateDeviceDto) {
    return `This action updates a #${id} device`;
  }

  remove(id: string) {
    return `This action removes a #${id} device`;
  }
}
