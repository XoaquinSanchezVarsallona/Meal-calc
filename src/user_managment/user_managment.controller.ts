import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserManagmentService } from './user_managment.service';
import { UserDTO } from './dto/create-user.dto';
import { UpdateUserManagmentDto } from './dto/update-user_managment.dto';
import { Credentials } from './dto/credentials';
import type { AuthTokens } from 'src/security/auth.service';
import { JwtAuthGuard } from 'src/security/guards/jwt-auth.guard';
import {
  CurrentUser,
  type CurrentUser as CurrentUserData,
} from 'src/security/decorators/current-user.decorator';

@Controller('user-managment')
export class UserManagmentController {
  constructor(private readonly userManagmentService: UserManagmentService) {}

  @Post()
  create(@Body() createUserManagmentDto: UserDTO) {
    return this.userManagmentService.create(createUserManagmentDto);
  }

  @Post('sign-in')
  signIn(@Body() credentials: Credentials): Promise<AuthTokens> {
    return this.userManagmentService.signIn(credentials);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMe(@CurrentUser() user: CurrentUserData) {
    return {
      userId: user.userId,
      email: user.email,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userManagmentService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserManagmentDto: UpdateUserManagmentDto,
  ) {
    return this.userManagmentService.update(id, updateUserManagmentDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userManagmentService.remove(id);
  }
}
