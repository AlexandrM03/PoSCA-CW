import { Body, Controller, Get, Param, Post, Put, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
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
	@Roles(Role.User)
	@Auth()
	@Get()
	async getAll(@Query() dto: GetAllTaskDto) {
		return this.taskService.getAll(dto);
	}

	@UseGuards(RolesGuard)
	@Roles(Role.User)
	@Auth()
	@Get('solved')
	async getSolved(@CurrentUser('id') id: number) {
		return this.taskService.getIdsOfSolvedTasks(id);
	}

	@UseGuards(RolesGuard)
	@Roles(Role.Admin)
	@Auth()
	@Get('unconfirmed')
	async getUnconfirmed() {
		return this.taskService.getUnconfirmed();
	}

	@UseGuards(RolesGuard)
	@Roles(Role.Admin, Role.User)
	@Auth()
	@Get(':id')
	async get(@Param('id') id: number) {
		return this.taskService.get(+id);
	}

	@UseGuards(RolesGuard)
	@Roles(Role.User)
	@Auth()
	@Post()
	async create(@Body() dto: TaskDto) {
		return this.taskService.create(dto);
	}

	@UseGuards(RolesGuard)
	@Roles(Role.Admin)
	@Auth()
	@Put(':id')
	async confirm(@Param('id') id: number) {
		return this.taskService.confirm(+id);
	}

	@UseGuards(RolesGuard)
	@Roles(Role.User)
	@Auth()
	@Post('check')
	async check(@Body() dto: TaskQueryDto, @CurrentUser('id') id: number) {
		return this.taskService.check(dto, id);
	}

	@UseGuards(RolesGuard)
	@Roles(Role.Admin, Role.User)
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
