import { SetMetadata } from '@nestjs/common';
import { REQUIRED_ROLES } from 'src/constants';
import { UserRole } from '../contracts/enums/user-role.enum';

export const RequiredUserRoles = (...roles: UserRole[]) =>
  SetMetadata(REQUIRED_ROLES, roles);
