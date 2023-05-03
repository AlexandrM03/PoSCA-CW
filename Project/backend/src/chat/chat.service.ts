import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { MessageDto } from './dto/message.dto';

@Injectable()
export class ChatService {
	constructor(private prisma: PrismaService) { }

	async create(dto: MessageDto) {
		const newMessage = await this.prisma.messages.create({
			data: {
				content: dto.content,
				discussion_id: +dto.discussionId,
				user_id: +dto.userId
			}
		});

		return await this.prisma.messages.findUnique({
			where: {
				id: newMessage.id
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

	async findAll(discussionId: number) {
		return await this.prisma.messages.findMany({
			where: {
				discussion_id: discussionId
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
}
