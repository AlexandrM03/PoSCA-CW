import { Inject, Injectable } from '@nestjs/common';
import { Client } from 'pg';

@Injectable()
export class ExercisesService {
	constructor(@Inject('TASKS_DB_CONNECTION') private pgClient: Client) { }

	async executeQuery(query: string) {
		return await this.pgClient.query(query);
	}
}
