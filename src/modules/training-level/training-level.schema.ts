import { Prop, Schema, SchemaFactory } from "node_modules/@nestjs/mongoose/dist";
import { Document, Types, Schema as mongooseSchema } from "mongoose";
import { TrainingTypeEnum } from "src/modules/training/enums/trainingType.enum";


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
        required: true,
        type: mongooseSchema.Types.Mixed
    })
    trainingProgram: unknown;
}

export const TrainingLevelSchema = SchemaFactory.createForClass(TrainingLevel);

TrainingLevelSchema.index(
    {
        trainingType: 1,
        trainingLevel: 1,
    },
    {
        unique: true,
        name: 'uk_trainingtype_traininglevel'
    }
);