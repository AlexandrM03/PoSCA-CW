import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class StatisticService {
	constructor(private prisma: PrismaService) { }

	async create(userId: number) {
		const statistic = await this.prisma.statistics.create({
			data: {
				user_id: userId
			}
		});

		return statistic;
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
