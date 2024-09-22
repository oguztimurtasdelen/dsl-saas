import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";


@Schema({timestamps: true})
export class Device extends Document{

    @Prop({unique: false, required: true})
    macAddress: string;

    @Prop({required: true})
    deviceCode: string;

    @Prop({required: true})
    deviceName: string;

    @Prop()
    description: string;
}

export const DeviceSchema = SchemaFactory.createForClass(Device);
