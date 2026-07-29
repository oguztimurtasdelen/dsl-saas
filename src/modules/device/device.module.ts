import { Module } from '@nestjs/common';
import { DeviceService } from './device.service';
import { DeviceController } from './device.controller';

import { MongooseModule } from '@nestjs/mongoose';
import { Device, DeviceSchema } from './device.schema';
import { DeviceRepository } from './device.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{name: Device.name, schema: DeviceSchema}])
  ],
  controllers: [
    DeviceController
  ],
  providers: [
    DeviceService,
    DeviceRepository,
  ],
  exports: [
    DeviceService
  ]
})
export class DeviceModule {}
