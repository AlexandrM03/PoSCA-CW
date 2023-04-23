import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { DiscussionService } from './discussion.service';
import { RolesGuard } from 'src/auth/decorators/role.decorator';
import { Auth, Roles } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/auth/enum/role.enum';
import { DiscussionDto } from './dto/discussion.dto';

@Controller('discussion')
export class DiscussionController {
	constructor(private readonly discussionService: DiscussionService) { }

	@UseGuards(RolesGuard)
	@Roles(Role.Admin, Role.User)
	@Auth()
	@Get()
	async getAll() {
		return await this.discussionService.getAll();
	}

	@UseGuards(RolesGuard)
	@Roles(Role.User)
	@Auth()
	@Post()
	async create(@Body() dto: DiscussionDto) {
		return await this.discussionService.create(dto);
	}

	@UseGuards(RolesGuard)
	@Roles(Role.Admin)
	@Auth()
	@Delete(':id')
	async delete(@Param('id') id: number) {
		return await this.discussionService.delete(+id);
	}
}
