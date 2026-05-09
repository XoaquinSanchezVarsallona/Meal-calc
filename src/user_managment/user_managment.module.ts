import { Module } from '@nestjs/common';
import { UserManagmentService } from './user_managment.service';
import { UserManagmentController } from './user_managment.controller';
import { SecurityModule } from 'src/security/security.module';

@Module({
  imports: [SecurityModule],
  controllers: [UserManagmentController],
  providers: [UserManagmentService],
  exports: [UserManagmentService],
})
export class UserManagmentModule {}
