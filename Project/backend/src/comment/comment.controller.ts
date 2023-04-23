import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CommentService } from './comment.service';
import { RolesGuard } from 'src/auth/decorators/role.decorator';
import { Auth, Roles } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/auth/enum/role.enum';
import { CommentDto } from './dto/comment.dto';

@Controller('comment')
export class CommentController {
	constructor(private readonly commentService: CommentService) { }

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
	@Post()
	async create(@Body() dto: CommentDto) {
		return await this.commentService.create(dto);
	}
}
