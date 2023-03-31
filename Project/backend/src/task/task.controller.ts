import { Body, Controller, Get, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { GetAllTaskDto } from './dto/get-all.task.dto';
import { TaskService } from './task.service';
import { CheckQueryDto } from './dto/check-query.dto';
import { TaskDto } from './dto/task.dto';

@Controller('task')
export class TaskController {
	constructor(private readonly taskService: TaskService) { }

	@UsePipes(new ValidationPipe())
	@Get()
	async getAll(@Query() dto: GetAllTaskDto) {
		return this.taskService.getAll(dto);
	}

	@UsePipes(new ValidationPipe())
	@Post()
	async create(@Body() dto: TaskDto) {
		return this.taskService.create(dto);
	}

	@UsePipes(new ValidationPipe())
	@Post('query')
	async query(@Body() dto: CheckQueryDto) {
		try {
			return (await this.taskService.executeQuery(dto.query)).rows;
		} catch (err) {
			return {
				error: 'Invalid query'
			}
		}
	}
}
