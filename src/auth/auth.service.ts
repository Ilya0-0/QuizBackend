import {
  ConflictException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthInputDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from 'src/common/contracts/interfaces/jwt.interface';
import { UserDto } from 'src/users/dto/user.dto';
import { UsersService } from 'src/users/users.service';
import type { ConfigType } from '@nestjs/config';
import authConfig from 'src/config/auth.config';
import { AppErrors } from 'src/constants/errors';

@Injectable()
export class AuthService {
  constructor(
    @Inject(authConfig.KEY)
    private authCfg: ConfigType<typeof authConfig>,
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(userId: number): Promise<UserDto> {
    const user = await this.usersService.findById(userId);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
  generateAccessToken(payload: JwtPayload): string {
    return this.jwtService.sign(payload);
  }
  generateRefreshToken(payload: JwtPayload): string {
    const expiresIn = this.authCfg.refreshTTL;
    const secret = this.authCfg.refreshSecret;

    return this.jwtService.sign(payload, {
      secret,
      expiresIn,
    });
  }
  async generateTokens(userId: number): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    const { login, role } = await this.usersService.findById(userId);

    const payload: JwtPayload = {
      sub: userId,
      login,
      role,
    };

    const newAccessToken = this.generateAccessToken(payload);
    const newRefreshToken = this.generateRefreshToken(payload);

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  }
  async signIn(
    data: AuthInputDto
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await this.usersService.findUserByLogin(data.login);

    if (!user) {
      throw new UnauthorizedException(AppErrors.INVALID_LOGIN_OR_PASSWORD);
    }

    const isPasswordValid = await bcrypt.compare(
      data.password,
      user.passwordHash
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException(AppErrors.INVALID_LOGIN_OR_PASSWORD);
    }

    const payload: JwtPayload = {
      sub: user.id,
      login: user.login,
      role: user.role,
    };

    return {
      accessToken: this.generateAccessToken(payload),
      refreshToken: this.generateRefreshToken(payload),
    };
  }
  async signUp(data: AuthInputDto) {
    const existingUser = await this.usersService.findUserByLogin(data.login);

    if (existingUser) {
      throw new ConflictException(AppErrors.USER_ALREADY_EXISTS);
    }

    const passwordHash = await bcrypt.hash(
      data.password,
      await bcrypt.genSalt()
    );

    const newUser = await this.usersService.create(data.login, passwordHash);
    return newUser;
  }
}
