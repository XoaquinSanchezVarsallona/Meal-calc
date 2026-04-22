import { Injectable } from '@nestjs/common';
import { UserDTO } from './dto/create-user.dto';
import { UpdateUserManagmentDto } from './dto/update-user_managment.dto';
import { PrismaClient } from '@prisma/client/extension';
import { User } from 'generated/prisma/client';

@Injectable()
export class UserManagmentService  {
  constructor(private prismaClient: PrismaClient) {}

  create(userDTO: UserDTO) : Promise<User> {
    const user : Promise<User>= this.prismaClient.user.create({
      data: {
        name: userDTO.name,
        email: userDTO.email,
        password: userDTO.password,
        height_cm: userDTO.height_cm,
        age: userDTO.age,
        gender: userDTO.gender,
        preferences: userDTO.preferences,
        goal: userDTO.goal
      }
    });
    return user;
  }

  findOne(id: string) : Promise<User | null> {
    return this.prismaClient.user.findUnique({
      where: {
        user_id: id
      }
    });
  }

  update(id: string, updateUserManagmentDto: UpdateUserManagmentDto) : Promise<User> {
    return this.prismaClient.user.update({
      where: {
        user_id: id
      },
      data: {
        name: updateUserManagmentDto.name,
        email: updateUserManagmentDto.email,
        password: updateUserManagmentDto.password,
        height_cm: updateUserManagmentDto.height_cm,
        age: updateUserManagmentDto.age,
        gender: updateUserManagmentDto.gender,
        preferences: updateUserManagmentDto.preferences,
        goal: updateUserManagmentDto.goal
      }
    });
  }

  remove(id: string) : Promise<User> {
    return this.prismaClient.user.delete({
      where: {
        user_id: id
      }
    });
  }
}
