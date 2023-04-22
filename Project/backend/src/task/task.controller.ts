import { Body, Controller, Get, Param, Post, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { GetAllTaskDto } from './dto/get-all.task.dto';
import { TaskService } from './task.service';
import { TaskQueryDto } from './dto/task-query.dto';
import { TaskDto } from './dto/task.dto';
import { Auth, Roles } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { RolesGuard } from 'src/auth/decorators/role.decorator';
import { Role } from 'src/auth/enum/role.enum';

@Controller('task')
export class TaskController {
	constructor(private readonly taskService: TaskService) { }

	@UseGuards(RolesGuard)
	@Roles(Role.Admin, Role.User)
	@Auth()
	@Get()
	async getAll(@Query() dto: GetAllTaskDto) {
		return this.taskService.getAll(dto);
	}

	@Auth()
	@Get(':id')
	async get(@Param('id') id: number) {
		return this.taskService.get(+id);
	}

	@Auth()
	@Post()
	async create(@Body() dto: TaskDto) {
		return this.taskService.create(dto);
	}

	@Auth()
	@Post('check')
	async check(@Body() dto: TaskQueryDto, @CurrentUser('id') id: number) {
		return this.taskService.check(dto, id);
	}

	@Auth()
	@Post('query')
	async query(@Body() dto: TaskQueryDto) {
		try {
			return (await this.taskService.executeQuery(dto.query)).rows;
		} catch (err) {
			return {
				error: 'Invalid query'
			}
		}
	}
}
