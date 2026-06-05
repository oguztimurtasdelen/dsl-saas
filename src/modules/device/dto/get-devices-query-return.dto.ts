import { Device } from "../device.schema";


export class GetDevicesQueryReturnDto {

  devices: Device[];

  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    deviceCode: string;
    deviceName: string;
    deviceStatus: string;
  };
}