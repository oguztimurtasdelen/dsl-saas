import { Module } from '@nestjs/common';
import { TrainingLevelController } from "./training-level.controller";
import { TrainingLevelService } from "./training-level.service";
import { MongooseModule } from "@nestjs/mongoose";
import { TrainingLevel, TrainingLevelSchema } from "./training-level.schema";

@Module({
    imports: [MongooseModule.forFeature([{name: TrainingLevel.name, schema: TrainingLevelSchema}])],
    controllers: [TrainingLevelController],
    providers: [TrainingLevelService],
    exports: [TrainingLevelService]
})
export class TrainingLevelModule {}