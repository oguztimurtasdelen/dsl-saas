import { Test, TestingModule } from '@nestjs/testing';
import { UserprofileService } from './userprofile.service';

describe('UserprofileService', () => {
  let service: UserprofileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserprofileService],
    }).compile();

    service = module.get<UserprofileService>(UserprofileService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
