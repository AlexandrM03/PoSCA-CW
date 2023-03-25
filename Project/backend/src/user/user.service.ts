import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { returnUserObject } from './return-user.object';

@Injectable()
export class UserService {
	constructor(private prisma: PrismaService) { }

	async byId(id: number) {
		const user = await this.prisma.users.findUnique({
			where: { id },
			select: {
				...returnUserObject
			}
		});

		if (!user) {
			throw new Error('User not found');
		}

		return user;
	}
}
