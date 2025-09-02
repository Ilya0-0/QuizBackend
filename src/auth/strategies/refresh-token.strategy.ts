import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from 'src/common/contracts/interfaces/jwt.interface';
import { AuthService } from '../auth.service';
import { extractRefreshTokenFromCookies } from '../utils/extractRefreshTokenFromCookies';
import { UserDto } from 'src/users/dto/user.dto';
import type { ConfigType } from '@nestjs/config';
import authConfig from 'src/config/auth.config';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh'
) {
  constructor(
    @Inject(authConfig.KEY)
    private authCfg: ConfigType<typeof authConfig>,
    private authService: AuthService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        extractRefreshTokenFromCookies,
      ]),
      ignoreExpiration: false,
      secretOrKey: authCfg.refreshSecret,
    });
  }

  async validate(payload: JwtPayload): Promise<UserDto> {
    const user = await this.authService.validateUser(payload.sub);
    return user;
  }
}
