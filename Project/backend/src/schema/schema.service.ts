import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class SchemaService {
	constructor(private prisma: PrismaService) { }

	async getSchemaByTaskId(taskId: number) {
		return await this.prisma.databases.findFirst({
			where: {
				tasks: {
					some: {
						id: taskId
					}
				}
			}
		});
	}

	async getAllSchemas() {
		return await this.prisma.databases.findMany();
	}
}
