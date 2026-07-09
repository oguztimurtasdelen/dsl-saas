import { DeviceMapper } from './device.mapper';
import { CreateDeviceDto } from './dto/create-device.dto';
import { TrainingTypeEnum } from '../training/enums/trainingType.enum';

describe('DeviceMapper', () => {
  it('maps trainingType from the create device dto to the device type', () => {
    const dto = new CreateDeviceDto();
    dto.macAddress = '00:1A:2B:3C:4D:5E';
    dto.trainingType = TrainingTypeEnum.REFLEX;
    dto.deviceCode = 'DVC-001';
    dto.deviceName = 'Device 1';
    dto.deviceStatus = 'ONLINE' as any;

    const result = DeviceMapper.convertDeviceDtoToType(dto);

    expect(result.trainingType).toBe(TrainingTypeEnum.REFLEX);
  });
});
