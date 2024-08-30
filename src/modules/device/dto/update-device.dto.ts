import { PartialType } from '@nestjs/mapped-types';
import { CreateDeviceDto } from './create-device.dto';
import { IsNotEmpty } from 'class-validator';
import message from 'src/customs/locales/message';

export class UpdateDeviceDto extends PartialType(CreateDeviceDto) {
    //@IsNotEmpty({message: message().device['id.not.empty']})
    _id : string;
    
}
