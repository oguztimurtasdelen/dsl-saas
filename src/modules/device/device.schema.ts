import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { DeviceStatus } from "src/customs/deviceStatus.enum";

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
        enum: DeviceStatus,
        default: DeviceStatus.Offline
    })
    status: DeviceStatus;

    @Prop({
        required: false, 
        type: String
    })
    description: string;
}

export const DeviceSchema = SchemaFactory.createForClass(Device);
