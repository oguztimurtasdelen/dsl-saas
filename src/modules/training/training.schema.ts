import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({timestamps: true})
export class Training extends Document {

    
}

export const TrainingSchema = SchemaFactory.createForClass(Training);