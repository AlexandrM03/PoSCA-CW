import { Injectable, CanActivate, ExecutionContext, UseGuards } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../enum/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(private reflector: Reflector) {
	}

	canActivate(ctx: ExecutionContext): boolean {
		const requiredRoles = this.reflector.get<Role[]>('roles', ctx.getHandler());

		if (!requiredRoles) {
			return true;
		}
		const { user } = ctx.switchToHttp().getRequest();
		if (!user) {
			return false;
		}
		return requiredRoles.some(role => user.role_id === role);
	}
}