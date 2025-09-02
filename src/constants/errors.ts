export const AppErrors = {
  INVALID_LOGIN_OR_PASSWORD: 'Invalid login or password',
  USER_ALREADY_EXISTS: 'User already exist',
  USER_NOT_FOUND: 'User not found',
  UNAUTHORIZED: 'Unauthorized',

  MISSING_ACCESS_TOKEN_LIFETIME: 'ACCESS_TOKEN_LIFETIME is missed',
  MISSING_REFRESH_TOKEN_LIFETIME: 'REFRESH_TOKEN_LIFETIME is missed',
  MISSING_JWT_CONFIG: 'Missing required env for JWT configuration',

  INVALID_TTL_FORMAT: 'Invalid TTL string format',
  UNSUPPORTED_TIME_POSTFIX: (postfix: string) =>
    `Unsupported time postfix: ${postfix}`,
};
