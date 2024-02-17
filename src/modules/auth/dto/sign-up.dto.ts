import { IsEmail, IsString, MinLength } from 'class-validator';

export class SignUpDto {
  @IsString()
  @IsEmail()
  name: string;

  @IsString()
  @MinLength(8)
  password: string;
}
