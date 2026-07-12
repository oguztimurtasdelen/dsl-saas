import { Module } from '@nestjs/common';
import { TrainingService } from './training.service';
import { TrainingController } from './training.controller';
import { MongooseModule } from "@nestjs/mongoose";
import { Training, TrainingSchema } from "./training.schema";
import { TrainingRegistry } from './registry/training.registry';
import { TrainingLevelModule } from '../training-level/training-level.module';

@Module({
  imports: [
    MongooseModule.forFeature([{name: Training.name, schema: TrainingSchema}]),
    TrainingLevelModule,
  ],
  controllers: [TrainingController],
  providers: [TrainingService],
})
export class TrainingModule {
  constructor() {
    TrainingRegistry.registerAll();
  }
}
