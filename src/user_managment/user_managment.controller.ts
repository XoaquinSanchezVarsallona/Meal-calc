import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserManagmentService } from './user_managment.service';
import { UserDTO } from './dto/create-user.dto';
import { UpdateUserManagmentDto } from './dto/update-user_managment.dto';
import { Credentials } from './dto/credentials';
import * as authService from 'src/security/auth.service';

@Controller('user-managment')
export class UserManagmentController {
  constructor(private readonly userManagmentService: UserManagmentService) {}

  @Post()
  create(@Body() createUserManagmentDto: UserDTO) {
    return this.userManagmentService.create(createUserManagmentDto);
  }

  signIn(@Body() credentials: Credentials) : authService.AuthTokens {
    return this.userManagmentService.signIn(credentials);
  }
  
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userManagmentService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserManagmentDto: UpdateUserManagmentDto) {
    return this.userManagmentService.update(id, updateUserManagmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userManagmentService.remove(id);
  }
}
