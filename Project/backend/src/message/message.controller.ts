import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { MessageService } from './message.service';
import { RolesGuard } from 'src/auth/decorators/role.decorator';
import { Auth, Roles } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/auth/enum/role.enum';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { MessageDto } from './dto/message.dto';

@Controller('discussion/:id/message')
export class MessageController {
	constructor(private readonly messageService: MessageService) { }

	@UseGuards(RolesGuard)
	@Roles(Role.User)
	@Auth()
	@Get()
	async getAll(@Param('id') id: number) {
		return await this.messageService.getAll(+id);
	}

	@UseGuards(RolesGuard)
	@Roles(Role.User)
	@Auth()
	@Post()
	async create(
		@Param('id') discussionId: number,
		@CurrentUser('id') userId: number,
		@Body() dto: MessageDto
	) {
		return await this.messageService.create(+discussionId, +userId, dto)
	}
}
