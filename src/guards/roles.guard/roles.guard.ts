import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/auth/decorators/role.decorator';
import { EnumRole } from 'src/users/enums/EnumRole';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext) {
    // get roles in metadata
    const requiredRoles: EnumRole[] = this.reflector.getAllAndOverride(
      ROLES_KEY,
      [context.getClass(), context.getHandler()],
    );

    if (!requiredRoles) return true;

    // get user metadata from jwt token

    // user از کجا آمد؟
    // از
    // JwtStrategy.validate()
    const {
      user,
    }: {
      user: { id: number; mobile: string; name: string; role: EnumRole };
    } = context.switchToHttp().getRequest();

    // check access role
    const hasRole = requiredRoles.includes(user.role);
    if (!hasRole)
      throw new ForbiddenException('شما اجازه دسترسی به این روت را ندارید');

    return true;
  }
}
