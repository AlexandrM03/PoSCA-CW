import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Client } from 'pg';

@Module({
	imports: [ConfigModule],
	providers: [
		{
			provide: 'TASKS_DB_CONNECTION',
			useFactory: async (configService: ConfigService) => {
				const client = new Client({
					user: configService.get<string>('DB_USER'),
					host: configService.get<string>('DB_HOST'),
					database: configService.get<string>('DB_NAME'),
					password: configService.get<string>('DB_PASSWORD'),
					port: configService.get<number>('DB_PORT'),
					ssl: {
						rejectUnauthorized: false
					}
				});
				await client.connect();
				return client;
			},
			inject: [ConfigService]
		},
	],
	exports: ['TASKS_DB_CONNECTION'],
})
export class ExercisesModule { }
