import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { APP_GUARD } from 'src/constants';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AccessTokenStrategy } from './strategies/access-token.strategy';
import { RefreshTokenStrategy } from './strategies/refresh-token.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import cookieConfig from 'src/config/cookie.config';
import { convertLifetimeStringToMilliseconds } from './utils/convertLifetimeStringToMilliseconds';
import { AppErrors } from 'src/constants/errors';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [cookieConfig],
    }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const accessTTL = configService.get<string>('ACCESS_TOKEN_LIFETIME');
        if (!accessTTL) {
          throw new Error(AppErrors.MISSING_ACCESS_TOKEN_LIFETIME);
        }

        return {
          secret: configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
          signOptions: {
            expiresIn: convertLifetimeStringToMilliseconds(accessTTL),
          },
        };
      },
    }),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AuthModule {}
