import { registerAs } from '@nestjs/config';
import { AppErrors } from 'src/constants/errors';

export default registerAs('auth', () => {
  const accessSecret = process.env.JWT_ACCESS_TOKEN_SECRET;
  const refreshSecret = process.env.JWT_REFRESH_TOKEN_SECRET;
  const accessTTL = process.env.ACCESS_TOKEN_LIFETIME;
  const refreshTTL = process.env.REFRESH_TOKEN_LIFETIME;

  if (!accessSecret || !refreshSecret || !accessTTL || !refreshTTL) {
    throw new Error(AppErrors.MISSING_JWT_CONFIG);
  }

  return {
    accessSecret,
    refreshSecret,
    accessTTL,
    refreshTTL,
  };
});
