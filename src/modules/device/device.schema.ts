import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { DeviceStatus } from "src/customs/deviceStatus.enum";

@Schema({timestamps: true})
export class Device extends Document {

    @Prop({
        unique: false, // switch true on prod
        required: true
    })
    macAddress: string;

    @Prop({required: true})
    deviceCode: string;

    @Prop({required: true})
    deviceName: string;

    @Prop({
        required: true,
        type: String,
        enum: DeviceStatus,
        default: DeviceStatus.Offline
    })
    status: DeviceStatus

    @Prop({required: false})
    description: string;
}

export const DeviceSchema = SchemaFactory.createForClass(Device);
