import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "node_modules/@nestjs/common";
import { TrainingLevelService } from "./training-level.service";
import { TrainingLevel } from "./training-level.schema";
import { GetTrainingLevelsQueryDto } from "./dto/get-training-levels-query.dto";
import { CreateTrainingLevelDto } from "./dto/create-training-level.dto";
import { UpdateTrainingLevelDto } from "./dto/update-training-level.dto";

@Controller('training-level')
export class TrainingLevelController {
    constructor(
        private readonly traininglevelService: TrainingLevelService
    ) {}

    @Get()
    findAll(@Query() query: GetTrainingLevelsQueryDto): Promise<TrainingLevel[]> {
        return this.traininglevelService.findAll(query);
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<TrainingLevel> {
        return this.traininglevelService.findOne(id);
    }

    @Post()
    async create(@Body() createTrainingLevelDto: CreateTrainingLevelDto): Promise<TrainingLevel> {
        return await this.traininglevelService.create(createTrainingLevelDto);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateTrainingLevelDto: UpdateTrainingLevelDto): Promise<TrainingLevel> {
        return await this.traininglevelService.update(id, updateTrainingLevelDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<TrainingLevel> {
        return this.traininglevelService.remove(id);
    }
    
}