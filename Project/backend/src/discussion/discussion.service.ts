import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { DiscussionDto } from './dto/discussion.dto';

@Injectable()
export class DiscussionService {
	constructor(private prisma: PrismaService) { }

	async getAll() {
		return await this.prisma.discussions.findMany({
			select: {
				id: true,
				topic: true
			}
		});
	}

	async create(dto: DiscussionDto) {
		return await this.prisma.discussions.create({
			data: {
				topic: dto.topic
			}
		});
	}

	async delete(id: number) {
		await this.prisma.messages.deleteMany({
			where: {
				discussion_id: id
			}
		});
		return await this.prisma.discussions.delete({
			where: {
				id
			}
		});
	}
}
