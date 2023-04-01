import { Module } from '@nestjs/common';
import { SolutionService } from './solution.service';
import { PrismaService } from 'src/prisma.service';

@Module({
	controllers: [],
	providers: [SolutionService, PrismaService]
})
export class SolutionModule { }
