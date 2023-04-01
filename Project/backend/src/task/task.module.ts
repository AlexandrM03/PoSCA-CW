import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { PrismaService } from 'src/prisma.service';
import { PaginationService } from 'src/pagination/pagination.service';
import { ExercisesService } from 'src/exercises/exercises.service';
import { ExercisesModule } from 'src/exercises/exercises.module';
import { StatisticService } from 'src/statistic/statistic.service';
import { SolutionService } from 'src/solution/solution.service';

@Module({
	controllers: [TaskController],
	providers: [TaskService, PrismaService, PaginationService, ExercisesService, StatisticService, SolutionService],
	imports: [ExercisesModule]
})
export class TaskModule { }
