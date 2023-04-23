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

	async create(dto: CommentDto) {
		return await this.prisma.comments.create({
			data: {
				content: dto.content,
				user_id: dto.userId,
				task_id: dto.taskId
			}
		});
	}
}
