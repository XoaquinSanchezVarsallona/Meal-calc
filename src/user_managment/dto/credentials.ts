import { IsEmail } from "class-validator";


export class Credentials {
  @IsEmail()
  email: string;
  password: string;
}