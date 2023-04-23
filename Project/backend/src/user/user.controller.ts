import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { Auth, Roles } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { UserService } from './user.service';
import { RolesGuard } from 'src/auth/decorators/role.decorator';
import { Role } from 'src/auth/enum/role.enum';

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) { }

	@UseGuards(RolesGuard)
	@Roles(Role.Admin, Role.User)
	@Auth()
	@Get()
	async getCurrentUser(@CurrentUser('id') id: number) {
		return this.userService.byId(id);
	}

	@UseGuards(RolesGuard)
	@Roles(Role.Admin, Role.User)
	@Auth()
	@Get(':username')
	async getProfile(@Param('username') username: string) {
		return this.userService.getProfile(username);
	}
}
