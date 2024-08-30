import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";


@Schema()
export class Device extends Document{
    /*
    @ObjectIdColumn()
    _id: string;
    */
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
