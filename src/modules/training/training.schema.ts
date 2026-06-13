import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Device } from "../device/device.schema";
import { Profile } from "../profile/profile.schema";
import { ReflexTrainingDto } from "./reflex/dto/reflex-training.dto";
import { TrainingStatusEnum } from "src/customs/utils/trainingStatus.enum";
import { TrainingTypeEnum } from "src/customs/utils/trainingType.enum";
import { ReflexTrainingResultDto } from "./reflex/dto/reflex-training-result.dto";

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
        required: true
    })
    trainingProgram: ReflexTrainingDto[];

    @Prop({
        unique: false,
        required: true
    })
    trainingResult: ReflexTrainingResultDto[];

}

export const TrainingSchema = SchemaFactory.createForClass(Training);