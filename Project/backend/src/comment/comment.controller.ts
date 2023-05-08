import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CommentService } from './comment.service';
import { RolesGuard } from 'src/auth/decorators/role.decorator';
import { Auth, Roles } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/auth/enum/role.enum';
import { CommentDto } from './dto/comment.dto';

@Controller('comment')
export class CommentController {
	constructor(private readonly commentService: CommentService) { }

	@UseGuards(RolesGuard)
	@Roles(Role.Admin)
	@Auth()
	@Get('reported')
	async getAllRepoted() {
		return await this.commentService.getAllRepoted();
	}

	@UseGuards(RolesGuard)
	@Roles(Role.User)
	@Auth()
	@Get(':id')
	async getAllByTaskId(@Param('id') taskId: number) {
		return await this.commentService.getAllByTaskId(+taskId);
	}

	@UseGuards(RolesGuard)
	@Roles(Role.User)
	@Auth()
	@Put(':id')
	async report(@Param('id') id: number) {
		return await this.commentService.report(+id);
	}

	@UseGuards(RolesGuard)
	@Roles(Role.Admin)
	@Auth()
	@Put(':id/reject')
	async reject(@Param('id') id: number) {
		return await this.commentService.reject(+id);
	}

	@UseGuards(RolesGuard)
	@Roles(Role.Admin)
	@Auth()
	@Delete(':id')
	async remove(@Param('id') id: number) {
		return await this.commentService.remove(+id);
	}

	@UseGuards(RolesGuard)
	@Roles(Role.User)
	@Auth()
	@Post()
	async create(@Body() dto: CommentDto) {
		return await this.commentService.create(dto);
	}
}
