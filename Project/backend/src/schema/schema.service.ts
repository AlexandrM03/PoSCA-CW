import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class SchemaService {
	constructor(private prisma: PrismaService) { }

	async getSchemaByTaskId(taskId: number) {
		return (await this.prisma.tasks.findUnique({
			where: {
				id: taskId
			},
			select: {
				databases: {
					select: {
						image_path: true
					}
				}
			}
		})).databases;
	}

	async getAllSchemas() {
		return await this.prisma.databases.findMany();
	}
}
