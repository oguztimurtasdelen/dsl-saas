import { Prop, Schema, SchemaFactory } from "node_modules/@nestjs/mongoose/dist";
import { Document, Types } from "mongoose";
import { TrainingTypeEnum } from "src/modules/training/enums/trainingType.enum";
import { ReflexTrainingDto } from "../training/training-types/reflex/dto/reflex.program.dto";


@Schema({
    timestamps: true,
    toJSON: { virtuals: true, versionKey: false },
    'id': false
})
export class TrainingLevel extends Document {
    _id: Types.ObjectId;

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
        type: Number
    })
    trainingLevel: number;

    @Prop({
        unique: false,
        required: true
    })
    trainingProgram: ReflexTrainingDto[]
}

export const TrainingLevelSchema = SchemaFactory.createForClass(TrainingLevel);