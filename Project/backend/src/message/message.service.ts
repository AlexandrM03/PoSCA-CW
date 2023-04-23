import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { MessageDto } from './dto/message.dto';

@Injectable()
export class MessageService {
	constructor(private prisma: PrismaService) { }

	async getAll(id: number) {
		return await this.prisma.messages.findMany({
			where: {
				discussion_id: id
			},
			select: {
				content: true,
				creation_time: true,
				users: {
					select: {
						username: true
					}
				}
			},
			orderBy: {
				creation_time: 'asc'
			}
		});
	}

	async create(discussionId: number, userId: number, dto: MessageDto) {
		return await this.prisma.messages.create({
			data: {
				content: dto.content,
				discussion_id: discussionId,
				user_id: userId
			}
		});
	}
}
