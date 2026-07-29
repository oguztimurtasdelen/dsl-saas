import { Injectable } from "node_modules/@nestjs/common";
import { InjectModel } from "node_modules/@nestjs/mongoose/dist";
import { Device } from "./device.schema";
import { FilterQuery, Model } from "mongoose";
import { GetDevicesQueryDto } from "./dto/get-devices-query.dto";
import { DeviceType } from "./device.type";

@Injectable()
export class DeviceRepository {
    constructor(
        @InjectModel(Device.name)
        private readonly deviceModel: Model<Device>
    ) {}

    async findAll(query: GetDevicesQueryDto, filter: FilterQuery<Device>): Promise<[Device[], number]> {
        const [deviceList, totalDeviceCount]: [Device[], number] = await Promise.all([
            this.deviceModel
            .find(filter)
            .sort({ traininType: 1 })
            .skip( (query.page - 1) * query.limit )
            .limit(query.limit)
            .exec(),

            this.deviceModel.countDocuments(filter).exec()
        ]);

        return [deviceList, totalDeviceCount];
    }

    async findOne(id: string): Promise<Device> {
        return await this.deviceModel.findById(id).exec();
    }

    async create(device: DeviceType): Promise<Device> {
        return await this.deviceModel.create(device);
    }

    async update(id: string, device: DeviceType): Promise<Device> {
        return await this.deviceModel.findByIdAndUpdate(
            id,
            device,
            {
                new: true,
                runValidators: true
            }
        );
    }

    async remove(id: string): Promise<Device> {
        return await this.deviceModel.findByIdAndDelete(id);
    }
}