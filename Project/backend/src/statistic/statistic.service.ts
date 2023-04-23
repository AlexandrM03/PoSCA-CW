import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { EnumStatisticSort, GetAllStatisticDto } from './dto/get-all.statistic';
import { Prisma } from '@prisma/client';
import { PaginationService } from 'src/pagination/pagination.service';

@Injectable()
export class StatisticService {
	constructor(
		private prisma: PrismaService,
		private paginationService: PaginationService
	) { }

	async getAll(dto: GetAllStatisticDto = {}) {
		const { sort } = dto;
		const prismaSort: Prisma.statisticsOrderByWithRelationInput[] = [];

		if (sort === EnumStatisticSort.MOST_SOLVED) {
			prismaSort.push({ tasks_completed: 'desc' })
		} else {
			prismaSort.push({ score: 'desc' })
		}

		const { perPage, skip } = this.paginationService.getPagination(dto);

		return await this.prisma.statistics.findMany({
			orderBy: prismaSort,
			skip,
			take: perPage,
			select: {
				score: true,
				tasks_completed: true,
				users: {
					select: {
						username: true
					}
				}
			}
		});
	}

	async updateStatistic(userId: number, score: number) {
		const statistic = await this.prisma.statistics.updateMany({
			where: {
				user_id: userId
			},
			data: {
				tasks_completed: {
					increment: 1
				},
				score: {
					increment: score
				}
			}
		})

		return statistic;
	}
}
