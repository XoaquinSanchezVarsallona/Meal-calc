import { Module } from '@nestjs/common';
import { UserManagmentService } from './user_managment.service';
import { UserManagmentController } from './user_managment.controller';

@Module({
  controllers: [UserManagmentController],
  providers: [UserManagmentService],
})
export class UserManagmentModule {}
