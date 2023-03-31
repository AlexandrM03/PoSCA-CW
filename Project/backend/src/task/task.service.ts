import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PaginationService } from 'src/pagination/pagination.service';
import { PrismaService } from 'src/prisma.service';
import { EnumTaskSort, GetAllTaskDto } from './dto/get-all.task.dto';
import { CheckQueryDto } from './dto/check-query.dto';
import { ExercisesService } from 'src/exercises/exercises.service';

@Injectable()
export class TaskService {
	constructor(
		private prisma: PrismaService,
		private paginationService: PaginationService,
		private exercisesService: ExercisesService
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

	async executeQuery(query: string) {
		return await this.exercisesService.executeQuery(query);
	}
}
