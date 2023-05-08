import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CommentDto } from './dto/comment.dto';

@Injectable()
export class CommentService {
	constructor(private prisma: PrismaService) { }

	async getAllByTaskId(taskId: number) {
		return await this.prisma.comments.findMany({
			where: {
				task_id: taskId
			},
			select: {
				id: true,
				content: true,
				creation_time: true,
				users: {
					select: {
						username: true
					}
				}
			},
			orderBy: {
				creation_time: 'desc'
			}
		});
	}

	async getAllRepoted() {
		return await this.prisma.comments.findMany({
			where: {
				reported: true
			},
			select: {
				id: true,
				content: true,
				creation_time: true,
				users: {
					select: {
						username: true
					}
				}
			},
			orderBy: {
				creation_time: 'desc'
			}
		});
	}

	async report(id: number) {
		return await this.prisma.comments.update({
			where: {
				id: id
			},
			data: {
				reported: true
			}
		});
	}

	async remove(id: number) {
		return await this.prisma.comments.delete({
			where: {
				id: id
			}
		});
	}

	async reject(id: number) {
		return await this.prisma.comments.update({
			where: {
				id: id
			},
			data: {
				reported: false
			}
		});
	}

	async create(dto: CommentDto) {
		return await this.prisma.comments.create({
			data: {
				content: dto.content,
				user_id: dto.userId,
				task_id: dto.taskId
			},
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
		});
	}
}
