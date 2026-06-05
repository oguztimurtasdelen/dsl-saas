import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DeviceType } from './device.type';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Device } from './device.schema';
import { DeviceMapper } from './device.mapper';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { GetDevicesQueryDto } from './dto/get-devices-query.dto';
import { GetDevicesQueryReturnDto } from './dto/get-devices-query-return.dto';

@Injectable()
export class DeviceService {

  constructor(
    @InjectModel(Device.name)
    private readonly deviceModel: Model<Device>
  ) {}

  async findAll(query: GetDevicesQueryDto): Promise<GetDevicesQueryReturnDto> {
    const page = query && query.page && query.page > 0 ? query.page : 1;
    const limit = query && query.limit && query.limit > 0 ? query.limit : 10;
    const skip = (page - 1) * limit;

    const filter: any = {};
    if (query) {
      if (query.deviceCode) filter.deviceCode = query.deviceCode;
      if (query.deviceName) filter.deviceName = query.deviceName;
      if (query.deviceStatus) filter.deviceStatus = query.deviceStatus;
    }

    const [devices, total] = await Promise.all([
      this.deviceModel
        .find(filter)
        .sort({ createdAt: -1 }) // Sort by creation date (newest first)
        .skip(skip)
        .limit(limit)
        .exec(),

      this.deviceModel.countDocuments(filter).exec(),
    ]);

    return <GetDevicesQueryReturnDto>{
      devices: devices,
      pagination: {
        page: page,
        limit: limit,
        total: total,
        totalPages: Math.ceil(total / limit),
        deviceCode: query?.deviceCode ?? null,
        deviceName: query?.deviceName ?? null,
        deviceStatus: query?.deviceStatus ?? null,
      },
    };
  }

  async findOne(_id: string): Promise<Device> {
    return await this.deviceModel.findById(_id);
  }

  async create(createDeviceDto: CreateDeviceDto): Promise<Device> {
    const deviceType: DeviceType = DeviceMapper.convertDeviceDtoToType(createDeviceDto);
    return await this.deviceModel.create(deviceType);
  }

  async update(id: string, updateDeviceDto: UpdateDeviceDto): Promise<Device | null | HttpException> {
    const deviceType: DeviceType = DeviceMapper.convertDeviceDtoToType(updateDeviceDto);
    const _device: Device | null = await this.deviceModel.findByIdAndUpdate(
      id, 
      deviceType,
      {
        new: true, // Returns updated data
        runValidators: true,
      }
    );

    if(_device) {
      return _device;
    } else {
      throw new HttpException(
        { success: false, message: 'Device not found!' },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async remove(id: string): Promise<Device | null | HttpException> {
    const _device: Device | null = await this.deviceModel.findByIdAndDelete(id);
    
    if(_device) {
      return _device;
    } else {
      throw new HttpException(
        { success: false, message: 'Device not found!' },
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
