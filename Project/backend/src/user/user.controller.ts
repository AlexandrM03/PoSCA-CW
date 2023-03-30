import { Controller, Get, Param } from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) { }

	@Get()
	@Auth()
	async getCurrentUser(@CurrentUser('id') id: number) {
		return this.userService.byId(id);
	}

	@Get(':username')
	@Auth()
	async getProfile(@Param('username') username: string) {
		return this.userService.getProfile(username);
	}
}
