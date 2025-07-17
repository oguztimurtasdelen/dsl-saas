import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { DeviceStatusEnum } from "src/customs/utils/deviceStatus.enum";

@Schema({timestamps: true})
export class Device extends Document {

    @Prop({
        unique: true,
        required: true,
        type: String,
        match: /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/ // Regex for MAC address format
    })
    macAddress: string;

    @Prop({
        unique: true,
        required: true,
        type: String
    })
    deviceCode: string;

    @Prop({
        required: true,
        type: String,
    })
    deviceName: string;

    @Prop({
        required: true,
        type: String,
        enum: DeviceStatusEnum,
        default: DeviceStatusEnum.OFFLINE
    })
    status: DeviceStatusEnum;

    @Prop({
        required: false,
        type: String
    })
    firmwareVersion: string;

    @Prop({
        required: false, 
        type: String
    })
    description: string;
}

export const DeviceSchema = SchemaFactory.createForClass(Device);
