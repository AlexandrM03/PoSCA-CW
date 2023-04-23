import { Module } from '@nestjs/common';
import { StatisticService } from './statistic.service';
import { StatisticController } from './statistic.controller';
import { PrismaService } from 'src/prisma.service';
import { PaginationService } from 'src/pagination/pagination.service';

@Module({
	controllers: [StatisticController],
	providers: [StatisticService, PrismaService, PaginationService]
})
export class StatisticModule { }
