import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PaginationService } from 'src/pagination/pagination.service';
import { PrismaService } from 'src/prisma.service';
import { EnumTaskSort, GetAllTaskDto } from './dto/get-all.task.dto';
import { ExercisesService } from 'src/exercises/exercises.service';
import { EnumTaskComplexity, TaskDto } from './dto/task.dto';
import { TaskQueryDto } from './dto/task-query.dto';
import { SolutionService } from 'src/solution/solution.service';
import { StatisticService } from 'src/statistic/statistic.service';

@Injectable()
export class TaskService {
	constructor(
		private prisma: PrismaService,
		private paginationService: PaginationService,
		private exercisesService: ExercisesService,
		private solutionService: SolutionService,
		private statisticService: StatisticService
	) { }

	async getAll(dto: GetAllTaskDto = {}) {
		const { sort, searchTerm } = dto;
		const prismaSort: Prisma.tasksOrderByWithRelationInput[] = [];

		if (sort === EnumTaskSort.LEAST_SOLVED) {
			prismaSort.push({ solved_times: 'asc' })
		} else if (sort === EnumTaskSort.MOST_SOLVED) {
			prismaSort.push({ solved_times: 'desc' })
		} else if (sort === EnumTaskSort.NEWEST) {
			prismaSort.push({ creation_time: 'desc' })
		} else {
			prismaSort.push({ creation_time: 'asc' })
		}

		const prismaSerchTermFilter: Prisma.tasksWhereInput = searchTerm ? {
			OR: [
				{
					title: {
						contains: searchTerm,
						mode: 'insensitive'
					}
				},
				{
					description: {
						contains: searchTerm,
						mode: 'insensitive'
					}
				}
			]
		} : {};

		const { perPage, skip } = this.paginationService.getPagination(dto);

		const tasks = await this.prisma.tasks.findMany({
			where: prismaSerchTermFilter,
			orderBy: prismaSort,
			skip,
			take: perPage
		});

		return {
			tasks,
			length: await this.prisma.tasks.count({
				where: prismaSerchTermFilter
			})
		}
	}

	async create(dto: TaskDto) {
		const complexity = await this.prisma.task_complexities.findFirst({
			where: {
				name: dto.complexity
			}, select: {
				id: true
			}
		});

		if (!complexity) {
			throw new NotFoundException('Invalid complexity');
		}

		const task = await this.prisma.tasks.create({
			data: {
				title: dto.title,
				description: dto.description,
				complexity_id: complexity.id,
				solution: dto.solution,
			}
		});

		return task;
	}

	async check(dto: TaskQueryDto, userId: number) {
		const task = await this.byId(dto.id);

		if (!task) {
			throw new NotFoundException('Task not found');
		}

		const result = await this.executeQuery(dto.query);

		if (JSON.stringify(result.rows) !== JSON.stringify(task.solution)) {
			return {
				success: false,
				message: 'Wrong answer'
			}
		}

		const solution = await this.solutionService.ByUserIdAndTaskId(userId, dto.id);

		if (!solution) {
			await this.solutionService.create(dto.id, userId, dto.query);

			await this.incrementSolvedTimes(dto.id);
			const score = await this.evaluateScore(dto.id);
			await this.statisticService.updateStatistic(userId, score);
		} else {
			await this.solutionService.update(solution.id, dto.query);
		}

		return {
			success: true,
			message: 'Correct answer'
		}
	}

	async executeQuery(query: string) {
		return await this.exercisesService.executeQuery(query);
	}

	private async byId(id: number) {
		return await this.prisma.tasks.findUnique({
			where: {
				id: id
			},
			select: {
				solution: true
			}
		});
	}

	private async incrementSolvedTimes(id: number) {
		await this.prisma.tasks.update({
			where: {
				id: id
			},
			data: {
				solved_times: {
					increment: 1
				}
			}
		});
	}

	private async evaluateScore(taskId: number) {
		const task = await this.prisma.tasks.findUnique({
			where: {
				id: taskId
			},
			select: {
				task_complexities: {
					select: {
						name: true
					},
				},
			},
		});

		if (task.task_complexities.name === EnumTaskComplexity.EASY) {
			return 100;
		} else if (task.task_complexities.name === EnumTaskComplexity.MEDIUM) {
			return 300;
		} else {
			return 1000;
		}
	}
}
