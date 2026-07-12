import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { TrainingService } from './training.service';
import { Training } from './training.schema';
import { TrainingLevelService } from '../training-level/training-level.service';
import { CreateTrainingDto } from './dto/create-training.dto';
import { TrainingFactory } from './factory/training.factory';
import { TrainingTypeEnum } from './enums/trainingType.enum';
import { TrainingStatusEnum } from './enums/trainingStatus.enum';

describe('TrainingService', () => {
  let service: TrainingService;
  let trainingModel: { create: jest.Mock };
  let trainingLevelService: { findByTrainingTypeAndLevel: jest.Mock };

  beforeEach(async () => {
    trainingModel = { create: jest.fn() };
    trainingLevelService = { findByTrainingTypeAndLevel: jest.fn() };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TrainingService,
        { provide: getModelToken(Training.name), useValue: trainingModel },
        { provide: TrainingLevelService, useValue: trainingLevelService },
      ],
    }).compile();

    service = module.get<TrainingService>(TrainingService);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should resolve trainingProgram from training level when level is provided and program is empty', async () => {
    const resolvedProgram = [{ type: TrainingTypeEnum.REFLEX, sequence: [] }];
    trainingLevelService.findByTrainingTypeAndLevel.mockResolvedValue({
      trainingProgram: resolvedProgram,
    });
    trainingModel.create.mockResolvedValue({ _id: new Types.ObjectId() });

    jest.spyOn(TrainingFactory, 'get').mockReturnValue({
      getHandlerName: jest.fn(),
      validateTrainingProgram: jest.fn(),
      validateTrainingResult: jest.fn(),
      calculateResult: jest.fn(),
    });

    const dto = {
      profile: new Types.ObjectId(),
      device: new Types.ObjectId(),
      trainingType: TrainingTypeEnum.REFLEX,
      trainingStatus: TrainingStatusEnum.STARTED,
      trainingLevel: 2,
      trainingProgram: undefined,
    } as CreateTrainingDto;

    await service.create(dto);

    expect(trainingLevelService.findByTrainingTypeAndLevel).toHaveBeenCalledWith(TrainingTypeEnum.REFLEX, 2);
    expect(trainingModel.create).toHaveBeenCalledWith(expect.objectContaining({ trainingProgram: resolvedProgram }));
  });
});
