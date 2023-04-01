import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class SolutionService {
	constructor(private prisma: PrismaService) { }

	async create(taskId: number, userId: number, query: string) {
		const solution = await this.prisma.solutions.create({
			data: {
				task_id: taskId,
				user_id: userId,
				query: query
			}
		});

		return solution;
	}

	async ByUserIdAndTaskId(userId: number, taskId: number) {
		const solution = await this.prisma.solutions.findFirst({
			where: {
				task_id: taskId,
				user_id: userId
			}
		});

		return solution;
	}

	async update(id: number, query: string) {
		const solution = await this.prisma.solutions.update({
			where: {
				id: id
			},
			data: {
				query: query,
				solution_time: new Date()
			}
		});

		return solution;
	}
}
