import { User } from './user.model';

export interface Statistic {
	id: number;
	tasks_completed: number;
	score: number;
	users: User;
}