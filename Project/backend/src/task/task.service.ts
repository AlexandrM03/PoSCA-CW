import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PaginationService } from 'src/pagination/pagination.service';
import { PrismaService } from 'src/prisma.service';
import { EnumTaskComplexitySort, EnumTaskSort, GetAllTaskDto } from './dto/get-all.task.dto';
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
		const { sort, searchTerm, complexity } = dto;
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

		const prismaComplexityFilter: Prisma.tasksWhereInput = complexity && complexity != EnumTaskComplexitySort.ALL ? {
			complexity_id: {
				equals: await this.getComplexityIdByName(complexity)
			}
		} : {};
		const { perPage, skip } = this.paginationService.getPagination(dto);

		const tasks = await this.prisma.tasks.findMany({
			where: {
				AND: [
					prismaSerchTermFilter,
					prismaComplexityFilter,
					{
						accepted: true
					}
				]
			},
			include: {
				task_complexities: {
					select: {
						name: true
					}
				}
			},
			orderBy: prismaSort,
			skip,
			take: perPage
		});

		return {
			tasks,
			length: await this.prisma.tasks.count({
				where: {
					AND: [
						prismaSerchTermFilter,
						prismaComplexityFilter
					]
				}
			})
		}
	}

	async getUnconfirmed() {
		return await this.prisma.tasks.findMany({
			where: {
				accepted: false
			},
			include: {
				task_complexities: {
					select: {
						name: true
					}
				}
			}
		});
	}

	async getComplexityIdByName(name: string) {
		const complexity = await this.prisma.task_complexities.findFirst({
			where: {
				name
			}, select: {
				id: true
			}
		});

		if (!complexity) {
			throw new NotFoundException('Invalid complexity');
		}

		return complexity.id;
	}

	async get(id: number) {
		const task = await this.byId(id);

		if (!task) {
			throw new NotFoundException('Task not found');
		}

		return task;
	}

	async getIdsOfSolvedTasks(userId: number) {
		const tasks = await this.prisma.tasks.findMany({
			where: {
				solutions: {
					some: {
						user_id: userId
					}
				}
			},
			select: {
				id: true
			}
		});

		return tasks.map(task => task.id);
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
				solution: JSON.parse(dto.solution),
				database_id: +dto.databaseId
			}
		});

		return task;
	}

	async confirm(id: number) {
		const task = await this.byId(id);

		if (!task) {
			throw new NotFoundException('Task not found');
		}

		await this.prisma.tasks.update({
			where: {
				id
			},
			data: {
				accepted: true
			}
		});
	}

	async reject(id: number) {
		const task = await this.byId(id);

		if (!task) {
			throw new NotFoundException('Task not found');
		}

		await this.prisma.tasks.delete({
			where: {
				id
			}
		});
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
				id
			}, include: {
				comments: {
					select: {
						id: true,
						content: true,
						creation_time: true,
						users: {
							select: {
								username: true
							}
						}
					}
				}
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
