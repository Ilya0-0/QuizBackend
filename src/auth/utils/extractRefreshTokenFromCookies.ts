import { Request } from 'express';
import { REFRESH_COOKIE_KEY } from 'src/config/cookie.config';

export const extractRefreshTokenFromCookies = (req: Request) => {
  if (req.cookies && REFRESH_COOKIE_KEY in req.cookies) {
    return req.cookies[REFRESH_COOKIE_KEY];
  }

  return null;
};
