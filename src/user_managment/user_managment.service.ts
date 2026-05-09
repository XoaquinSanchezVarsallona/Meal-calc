import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { UserDTO } from './dto/create-user.dto';
import { UpdateUserManagmentDto } from './dto/update-user_managment.dto';
import { PrismaClient, type User } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { AuthService, AuthTokens } from 'src/security/auth.service';
import { Credentials } from './dto/credentials';

@Injectable()
export class UserManagmentService implements OnModuleDestroy {
  private readonly prismaClient = new PrismaClient({
    adapter: new PrismaPg({
      connectionString: process.env.DATABASE_URL ?? 'postgresql://user:password@localhost:5432/meal-calc',
    }),
  });

  constructor(private readonly authService: AuthService) {}

  signIn(credentials: Credentials): Promise<AuthTokens> {
    return this.prismaClient.$transaction(async (prisma) => {
      const user = await prisma.user.findUnique({
        where: {
          email: credentials.email,
        },
      });

      if (!user || user.password !== credentials.password) {
        throw new Error('Invalid credentials');
      }

      const tokens = await this.authService.generateTokens(user.id, user.email);

      return {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        expiresIn: tokens.expiresIn,
      };
    });
  }

  create(userDTO: UserDTO) : Promise<User> {
    const user : Promise<User>= this.prismaClient.user.create({
      data: {
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
        id,
      }
    });
  }

  update(id: string, updateUserManagmentDto: UpdateUserManagmentDto) : Promise<User> {
    return this.prismaClient.user.update({
      where: {
        id,
      },
      data: {
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
        id,
      }
    });
  }

  async onModuleDestroy(): Promise<void> {
    await this.prismaClient.$disconnect();
  }
}
