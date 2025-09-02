import { SetMetadata } from '@nestjs/common';
import { IS_PUBLIC_ROUTE } from 'src/constants';

export const PublicRoute = () => SetMetadata(IS_PUBLIC_ROUTE, true);
