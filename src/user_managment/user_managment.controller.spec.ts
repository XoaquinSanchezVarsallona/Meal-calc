import { Test, TestingModule } from '@nestjs/testing';
import { UserManagmentController } from './user_managment.controller';
import { UserManagmentService } from './user_managment.service';

describe('UserManagmentController', () => {
  let controller: UserManagmentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserManagmentController],
      providers: [UserManagmentService],
    }).compile();

    controller = module.get<UserManagmentController>(UserManagmentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
