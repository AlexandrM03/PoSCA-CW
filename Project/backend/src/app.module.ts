import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config/dist';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma.service';
import { UserModule } from './user/user.module';
import { PaginationModule } from './pagination/pagination.module';
import { TaskModule } from './task/task.module';
import { ExercisesService } from './exercises/exercises.service';
import { ExercisesModule } from './exercises/exercises.module';
import { SolutionModule } from './solution/solution.module';
import { StatisticModule } from './statistic/statistic.module';

@Module({
	imports: [ConfigModule.forRoot(), AuthModule, UserModule, PaginationModule, TaskModule, ExercisesModule, SolutionModule, StatisticModule],
	controllers: [AppController],
	providers: [AppService, PrismaService, ExercisesService],
})
export class AppModule { }
