import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist';
import { hash, verify } from 'argon2';
import { PrismaService } from 'src/prisma.service';
import { AuthDto } from './dto/auth.dto';
import { users } from '@prisma/client';

@Injectable()
export class AuthService {
	constructor(private prisma: PrismaService, private jwt: JwtService) { }

	async register(dto: AuthDto) {
		const oldUser = await this.prisma.users.findMany({
			where: {
				OR: [
					{
						email: dto.email
					},
					{
						username: dto.username
					}
				],
			}
		});

		if (oldUser.length > 0) {
			throw new BadRequestException('User already exists');
		}

		const userRole = await this.prisma.user_roles.findFirst({
			where: {
				name: 'user'
			}
		});

		const user = await this.prisma.users.create({
			data: {
				email: dto.email,
				username: dto.username,
				password: await hash(dto.password),
				role_id: userRole.id
			}
		});

		const tokens = await this.issueTokens(user.id);

		return {
			user: this.returnUserFields(user),
			...tokens
		}
	}

	async login(dto: Omit<AuthDto, 'username'>) {
		const user = await this.validateUser(dto);
		const tokens = await this.issueTokens(user.id);

		return {
			user: this.returnUserFields(user),
			...tokens
		}
	}

	async getNewTokens(refreshToken: string) {
		const result = await this.jwt.verifyAsync(refreshToken);

		if (!result) {
			throw new UnauthorizedException('Invalid refresh token');
		}

		const user = await this.prisma.users.findUnique({
			where: {
				id: result.id
			}
		})

		const tokens = await this.issueTokens(user.id);

		return {
			user: this.returnUserFields(user),
			...tokens
		}
	}

	private async issueTokens(userId: number) {
		const data = { id: userId };

		const accessToken = this.jwt.sign(data, {
			expiresIn: '1h'
		});

		const refreshToken = this.jwt.sign(data, {
			expiresIn: '7d'
		});

		return { accessToken, refreshToken };
	}

	private returnUserFields(user: users) {
		return {
			id: user.id,
			email: user.email
		}
	}

	private async validateUser(dto: Omit<AuthDto, 'username'>) {
		const user = await this.prisma.users.findUnique({
			where: {
				email: dto.email
			}
		});

		if (!user) {
			throw new NotFoundException('User not found');
		}

		const isValid = await verify(user.password, dto.password);

		if (!isValid) {
			throw new UnauthorizedException('Invalid credentials');
		}

		return user;
	}
}