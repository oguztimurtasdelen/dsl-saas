import { Controller, Get, Post, Body, Put, Param, Delete, HttpException, Query } from '@nestjs/common';
import { DeviceService } from './device.service';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { Device } from './device.schema';
import { GetDevicesQueryDto } from './dto/get-devices-query.dto';
import { GetDevicesQueryReturnDto } from './dto/get-devices-query-return.dto';


@Controller('device')
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}

  @Get()
  async findAll(@Query() query: GetDevicesQueryDto): Promise<GetDevicesQueryReturnDto> {
    return await this.deviceService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Device> {
    return await this.deviceService.findOne(id);
  }

  @Post()
  async create(@Body() createDeviceDto: CreateDeviceDto) {
    return await this.deviceService.create(createDeviceDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateDeviceDto: UpdateDeviceDto): Promise<Device | null | HttpException> {
    return await this.deviceService.update(id, updateDeviceDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Device | null | HttpException> {
    return await this.deviceService.remove(id);
  }
}
