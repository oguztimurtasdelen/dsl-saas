import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ErrorLogDocument = ErrorLog & Document;

@Schema({
  timestamps: true,
  toJSON: { versionKey: false },
})
export class ErrorLog {
  _id: Types.ObjectId;

  @Prop({ required: true, type: String })
  message: string;

  @Prop({ type: String, default: null })
  stack: string | null;

  @Prop({ type: Number, default: 500 })
  statusCode: number;

  @Prop({ type: String, default: 'INTERNAL_SERVER_ERROR' })
  code: string;

  @Prop({ type: String, default: null })
  method: string | null;

  @Prop({ type: String, default: null })
  path: string | null;

  @Prop({ type: String, default: null })
  userId: string | null;

  @Prop({ type: String, default: null })
  profileId: string | null;

  @Prop({ type: String, default: null })
  ipAddress: string | null;

  @Prop({ type: String, default: null })
  userAgent: string | null;

  @Prop({ type: Boolean, default: false })
  isResolved: boolean;

  @Prop({ type: Date, default: null })
  resolvedAt: Date | null;

  @Prop({ type: String, default: null })
  resolvedBy: string | null;

  @Prop({ type: String, default: null })
  resolutionNote: string | null;

  @Prop({ type: String, default: 'error' })
  severity: string;

  @Prop({ type: Object, default: {} })
  metadata: Record<string, any>;
}

export const ErrorLogSchema = SchemaFactory.createForClass(ErrorLog);
