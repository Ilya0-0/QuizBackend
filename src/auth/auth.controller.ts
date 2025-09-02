import {
  Body,
  Controller,
  Inject,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthInputDto } from './dto/auth.dto';
import { RefreshTokenGuard } from 'src/common/guards/refresh.guard';
import { PublicRoute } from 'src/common/decorators/public-route.decorator';
import type { Response } from 'express';
import type { ConfigType } from '@nestjs/config';
import cookieConfig from 'src/config/cookie.config';

@Controller()
export class AuthController {
  constructor(
    @Inject(cookieConfig.KEY)
    private cookieCfg: ConfigType<typeof cookieConfig>,
    private readonly authService: AuthService
  ) {}

  @Post('sign-in')
  @PublicRoute()
  async signIn(
    @Body() authData: AuthInputDto,
    @Res({ passthrough: true }) res: Response
  ) {
    const { accessToken, refreshToken } =
      await this.authService.signIn(authData);

    res.cookie(this.cookieCfg.name, refreshToken, this.cookieCfg.options);

    return { accessToken };
  }

  @Post('sign-up')
  @PublicRoute()
  signUp(@Body() authData: AuthInputDto) {
    return this.authService.signUp(authData);
  }

  @Post('refresh')
  @PublicRoute()
  @UseGuards(RefreshTokenGuard)
  async refreshToken(
    @Req() req: any,
    @Res({ passthrough: true }) res: Response
  ) {
    const userId = req.user.id;

    const { accessToken, refreshToken: newRefreshToken } =
      await this.authService.generateTokens(userId);

    res.cookie(this.cookieCfg.name, newRefreshToken, this.cookieCfg.options);

    return { accessToken };
  }
}
