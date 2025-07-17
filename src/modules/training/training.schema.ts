import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Device } from "../device/device.schema";
import { Profile } from "../profile/profile.schema";
import { ReflexTrainingDto } from "./dto/reflex-training.dto";
import { TrainingStatusEnum } from "src/customs/utils/trainingStatus.enum";
import { TrainingTypeEnum } from "src/customs/utils/trainingType.enum";

@Schema({timestamps: true})
export class Training extends Document {

    @Prop({unique: false, ref: Profile.name})
    profile: Types.ObjectId;
    
    @Prop({unique: false, ref: Device.name})
    device: Types.ObjectId;
    
   @Prop({
        unique: false, 
        required: true, 
        type: String, 
        enum: TrainingTypeEnum, 
        default: TrainingTypeEnum.REFLEX
    })
    trainingType: TrainingTypeEnum;
    
    @Prop({unique: false, required: true})
    trainingProgram: ReflexTrainingDto;
    
    @Prop({
        unique: false, 
        required: true, 
        type: String, 
        enum: TrainingStatusEnum, 
        default: TrainingStatusEnum.CREATED
    })
    trainingStatus: TrainingStatusEnum



    
}

export const TrainingSchema = SchemaFactory.createForClass(Training);