import { Injectable } from '@nestjs/common';
import { CreateUserManagmentDto } from './dto/create-user.dto';
import { UpdateUserManagmentDto } from './dto/update-user_managment.dto';

@Injectable()
export class UserManagmentService {
  create(createUserManagmentDto: CreateUserManagmentDto) {
    return 'This action adds a new userManagment';
  }

  findAll() {
    return `This action returns all userManagment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userManagment`;
  }

  update(id: number, updateUserManagmentDto: UpdateUserManagmentDto) {
    return `This action updates a #${id} userManagment`;
  }

  remove(id: number) {
    return `This action removes a #${id} userManagment`;
  }
}
