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

    const {
      user,
    }: {
      user: { userId: number; mobile: string; name: string; role: EnumRole };
    } = context.switchToHttp().getRequest();

    // check access role
    const hasRole = requiredRoles.includes(user.role);
    if (!hasRole)
      throw new ForbiddenException('شما اجازه دسترسی به این روت را ندارید');

    return true;
  }

  //   handleRequest(
  //     err: any,
  //     user: any,
  //     info: any,
  //     context: ExecutionContext,
  //     status?: any,
  //   ) {
  //     if (err || !user) {
  //       throw err || new UnauthorizedException('توکن شما نامعتبر');
  //     }

  //     return user;
  //   }
}
