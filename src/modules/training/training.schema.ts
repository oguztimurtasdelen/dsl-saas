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
        required: true,
        type: Types.ObjectId,
        unique: false, 
        ref: Profile.name
    })
    profile: Types.ObjectId;
    
    @Prop({
        required: false,
        type: Types.ObjectId,
        unique: false, 
        ref: Device.name,
        default: null
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
        required: false, 
        type: Number, 
        default: null
    })
    trainingLevel: number;
    
    @Prop({
        unique: false, 
        required: false,
        type: mongooseSchema.Types.Mixed,
        default: null
    })
    trainingProgram: unknown;

    @Prop({
        unique: false,
        required: false,
        type: mongooseSchema.Types.Mixed,
        default: null
    })
    trainingResult: unknown;

    @Prop({
        unique: false,
        required: false,
        type: mongooseSchema.Types.Mixed,
        default: null
    })
    trainingMetrics: unknown;

}

export const TrainingSchema = SchemaFactory.createForClass(Training);

TrainingSchema.index(
    {
        profile: 1,
        trainingType: 1,
    },
    {
        unique: false,
        name: 'idx_profile_trainingtype'
    }
);

TrainingSchema.index(
    {
        profile: 1,
        trainingType: 1,
        trainingLevel: 1
    },
    {
        unique: false,
        name: 'idx_profile_trainingtype_traininglevel'
    }
);