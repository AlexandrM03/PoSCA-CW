import { Controller, Get, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { GetAllTaskDto } from './dto/get-all.task.dto';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
	constructor(private readonly taskService: TaskService) { }

	@UsePipes(new ValidationPipe())
	@Get()
	async getAll(@Query() queryDto: GetAllTaskDto) {
		return this.taskService.getAll(queryDto);
	}
}
