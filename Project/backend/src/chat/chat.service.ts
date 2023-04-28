import { Injectable } from '@nestjs/common';
import { ChatDto } from './dto/chat.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ChatService {
	constructor(private prisma: PrismaService) { }

	async create(dto: ChatDto) {
		return await this.prisma.messages.create({
			data: {
				content: dto.content,
				discussion_id: +dto.discussionId,
				user_id: +dto.userId
			}
		});
	}
}
