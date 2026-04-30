import { Module } from '@nestjs/common';
import { UserManagmentService } from './user_managment.service';
import { UserManagmentController } from './user_managment.controller';
import { AuthService } from 'src/security/auth.service';

@Module({
  controllers: [UserManagmentController],
  providers: [UserManagmentService, AuthService],
})
export class UserManagmentModule {}
