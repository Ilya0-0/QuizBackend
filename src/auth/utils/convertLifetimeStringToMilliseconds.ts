import { AppErrors } from 'src/constants/errors';

type TimePostfix = 'd' | 'm';

export const convertLifetimeStringToMilliseconds = (ttl: string): number => {
  const timePostfix = ttl.at(-1) as TimePostfix | undefined;
  const timeValue = parseInt(ttl.slice(0, -1), 10);

  if (isNaN(timeValue) || !timePostfix) {
    throw new Error(AppErrors.INVALID_TTL_FORMAT);
  }

  switch (timePostfix) {
    case 'd':
      return timeValue * 24 * 60 * 60 * 1000;
    case 'm':
      return timeValue * 60 * 1000;
    default:
      throw new Error(AppErrors.UNSUPPORTED_TIME_POSTFIX(timePostfix));
  }
};
