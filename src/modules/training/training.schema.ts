import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types, Schema as mongooseSchema } from "mongoose";
import { Device } from "../device/device.schema";
import { Profile } from "../profile/profile.schema";
import { TrainingStatusEnum } from "src/modules/training/enums/trainingStatus.enum";
import { TrainingTypeEnum } from "src/modules/training/enums/trainingType.enum";

@Schema({
    timestamps: true,
    toJSON: { virtuals: true, versionKey: false },
    'id': false
})
export class Training extends Document {

    _id: Types.ObjectId;

    @Prop({
        type: Types.ObjectId,
        unique: false, 
        ref: Profile.name
    })
    profile: Types.ObjectId;
    
    @Prop({
        type: Types.ObjectId,
        unique: false, 
        ref: Device.name
    })
    device: Types.ObjectId;
    
   @Prop({
        unique: false, 
        required: true, 
        type: String, 
        enum: TrainingTypeEnum
    })
    trainingType: TrainingTypeEnum;

    @Prop({
        unique: false, 
        required: true, 
        type: String, 
        enum: TrainingStatusEnum, 
        default: TrainingStatusEnum.NEW
    })
    trainingStatus: TrainingStatusEnum
    
    @Prop({
        unique: false, 
        required: true,
        type: mongooseSchema.Types.Mixed
    })
    trainingProgram: unknown;

    @Prop({
        unique: false,
        required: true,
        type: mongooseSchema.Types.Mixed
    })
    trainingResult: unknown;

}

export const TrainingSchema = SchemaFactory.createForClass(Training);