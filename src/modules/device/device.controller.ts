import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { DeviceService } from './device.service';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { convertCreateDeviceDtoToType, convertUpdateDeviceDtoToType } from './functions/convertDtoToType.function';

@Controller('device')
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}

  @Post()
  async create(@Body() createDeviceDto: CreateDeviceDto) {
    const _createdDevice = await this.deviceService.create(convertCreateDeviceDtoToType(createDeviceDto));

    return _createdDevice;
  }

  @Get()
  async findAll() {
    return await this.deviceService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.deviceService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateDeviceDto: UpdateDeviceDto) {
    return this.deviceService.update(id, convertUpdateDeviceDtoToType(updateDeviceDto));
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deviceService.remove(id);
  }
}
