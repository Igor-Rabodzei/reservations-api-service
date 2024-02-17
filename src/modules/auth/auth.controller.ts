import {
  Body,
  Controller,
  Post,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  async signUp(@Body() signUpDto: SignInDto) {
    const data = await this.authService.signUp(signUpDto);
    if (data.error) throw new BadRequestException(data.error);
    else return data;
  }

  @Post('sign-in')
  async signIn(@Body() signInDto: SignInDto) {
    const data = await this.authService.signIn(signInDto);
    if (data.error) throw new UnauthorizedException(data.error);
    else return data;
  }
}
