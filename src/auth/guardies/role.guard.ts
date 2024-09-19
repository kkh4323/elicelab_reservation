import { Role } from '../../user/entities/role.enum';
import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RequestWithUserInterface } from '../interfaces/requestWithUser.interface';

export const RoleGuard = (role: Role): Type<CanActivate> => {
  class RoleGuardMixin extends JwtAuthGuard {
    async canActivate(context: ExecutionContext) {
      await super.canActivate(context);

      const req = context.switchToHttp().getRequest<RequestWithUserInterface>();
      const user = req.user;
      return user?.roles.includes(role);
    }
  }
  return mixin(RoleGuardMixin);
};
