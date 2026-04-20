import { Test, TestingModule } from '@nestjs/testing';
import { UserManagmentService } from './user_managment.service';

describe('UserManagmentService', () => {
  let service: UserManagmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserManagmentService],
    }).compile();

    service = module.get<UserManagmentService>(UserManagmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
