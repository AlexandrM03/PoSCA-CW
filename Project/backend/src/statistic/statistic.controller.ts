import { Controller, Get, UseGuards } from '@nestjs/common';
import { StatisticService } from './statistic.service';
import { RolesGuard } from 'src/auth/decorators/role.decorator';
import { Auth, Roles } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/auth/enum/role.enum';

@Controller('statistic')
export class StatisticController {
	constructor(private readonly statisticService: StatisticService) { }

	@UseGuards(RolesGuard)
	@Roles(Role.User)
	@Auth()
	@Get()
	async getAll() {
		return await this.statisticService.getAll();
	}
}
