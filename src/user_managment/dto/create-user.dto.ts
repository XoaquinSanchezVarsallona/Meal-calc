import { Type } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import { Gender, Goal } from 'generated/prisma/client';

export class UserDTO {
  @IsOptional()
  id?: string;

  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @MinLength(8)
  @Matches(/^(?=.*[A-Z])(?=(?:.*[^A-Za-z0-9]){2,}).+$/, {
    message: 'password debe tener al menos una mayúscula y dos caracteres especiales',
  })
  password: string;

  @Type(() => Number)
  @IsNumber()
  height_cm: number;

  @Type(() => Number)
  @IsNumber()
  age: number;

  @IsEnum(Gender)
  gender: Gender;

  @IsString()
  preferences: string;

  @IsEnum(Goal)
  goal: Goal;
}

export class UserResponseDTO {
  id: string;
  name: string;
  password: string;
}
