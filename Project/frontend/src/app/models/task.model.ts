import { Comment } from './comment.model';

export interface Task {
	id: number;
	title: string;
	description: string;
	creation_time: Date;
	solved_times: number;
	solution: object[];
	accepted: boolean;
	complexity_id: number;
	comments?: Comment[]
}