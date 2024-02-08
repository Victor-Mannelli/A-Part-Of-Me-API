import { Test, TestingModule } from '@nestjs/testing';
import { AnimesService } from './animes.service';

describe('AnimesService', () => {
  let service: AnimesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnimesService],
    }).compile();

    service = module.get<AnimesService>(AnimesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
