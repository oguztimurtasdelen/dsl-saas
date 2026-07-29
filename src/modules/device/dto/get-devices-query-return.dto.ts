import { Device } from "../device.schema";
import { GetDevicesQueryDto } from "./get-devices-query.dto";


export class GetDevicesQueryReturnDto {
  devices: Device[];
  pagination: GetDevicesQueryDto;
  total: number;
  totalPages: number;

}