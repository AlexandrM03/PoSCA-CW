import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { PrismaService } from 'src/prisma.service';
import { PaginationService } from 'src/pagination/pagination.service';

@Module({
	controllers: [TaskController],
	providers: [TaskService, PrismaService, PaginationService]
})
export class TaskModule { }
