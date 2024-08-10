import { Test, TestingModule } from '@nestjs/testing';
import { UserprofileController } from './userprofile.controller';
import { UserprofileService } from './userprofile.service';

describe('UserprofileController', () => {
  let controller: UserprofileController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserprofileController],
      providers: [UserprofileService],
    }).compile();

    controller = module.get<UserprofileController>(UserprofileController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
