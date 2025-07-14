import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { DeviceService } from './device.service';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import * as deviceFunction from './functions/device.function';
import { DeviceType } from './device.type';

@Controller('device')
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}

  @Post()
  async create(@Body() createDeviceDto: CreateDeviceDto) {
    const deviceType: DeviceType = deviceFunction.convertDeviceDtoToType(createDeviceDto);
    return await this.deviceService.create(deviceType);
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
  async update(@Param('id') id: string, @Body() updateDeviceDto: UpdateDeviceDto) {
    const deviceType: DeviceType = deviceFunction.convertDeviceDtoToType(updateDeviceDto);
    return await this.deviceService.update(id, deviceType);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.deviceService.remove(id);
  }
}
