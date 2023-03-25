import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { users } from '@prisma/client';

export const CurrentUser = createParamDecorator(
	(data: keyof users, ctx: ExecutionContext) => {
		const req = ctx.switchToHttp().getRequest();
		const user = req.user;

		return data ? user[data] : user
	}
)