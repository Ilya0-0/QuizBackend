import { registerAs } from '@nestjs/config';
import { convertLifetimeStringToMilliseconds } from 'src/auth/utils/convertLifetimeStringToMilliseconds';
import { AppErrors } from 'src/constants/errors';

export const REFRESH_COOKIE_KEY = 'refreshToken';

export default registerAs('cookie', () => {
  const maxAge = process.env.REFRESH_TOKEN_LIFETIME;

  if (!maxAge) {
    throw new Error(AppErrors.MISSING_REFRESH_TOKEN_LIFETIME);
  }

  return {
    name: REFRESH_COOKIE_KEY,
    options: {
      path: '/',
      domain: process.env.FRONTEND_HOST,
      httpOnly: true,
      sameSite: 'strict' as 'strict',
      secure: process.env.NODE_ENV === 'production',
      maxAge: convertLifetimeStringToMilliseconds(maxAge),
    },
  };
});
