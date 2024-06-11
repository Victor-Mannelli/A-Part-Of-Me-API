import { Test, TestingModule } from '@nestjs/testing';
import { FriendsChatGateway } from './friends_chat.gateway';

describe('FriendsChatGateway', () => {
  let gateway: FriendsChatGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FriendsChatGateway],
    }).compile();

    gateway = module.get<FriendsChatGateway>(FriendsChatGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
