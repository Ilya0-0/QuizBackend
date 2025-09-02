import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { UserRole } from '../contracts/enums/user-role.enum';
import { REQUIRED_ROLES } from 'src/constants';

@Injectable()
export class UserRoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.get<UserRole[]>(
      REQUIRED_ROLES,
      context.getHandler()
    );

    const request = context.switchToHttp().getRequest();
    const role = request.user.role;

    return requiredRoles.includes(role);
  }
}
