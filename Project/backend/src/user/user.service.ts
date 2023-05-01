import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
	constructor(private prisma: PrismaService) { }

	async byId(id: number) {
		const user = await this.prisma.users.findUnique({
			where: { id },
			select: {
				id: true,
				username: true
			}
		});

		if (!user) {
			throw new Error('User not found');
		}

		return user;
	}

	async getProfile(username: string) {
		const user = await this.prisma.users.findUnique({
			where: { username },
			select: {
				id: true,
				username: true,
				email: true,
				solutions: {
					select: {
						id: true,
						query: true,
						solution_time: true,
						tasks: {
							select: {
								title: true,
							}
						}
					}
				},
				statistics: {
					select: {
						score: true,
						tasks_completed: true,
					}
				}
			}
		})

		if (!user) {
			throw new Error('User not found');
		}

		return user;
	}
}
