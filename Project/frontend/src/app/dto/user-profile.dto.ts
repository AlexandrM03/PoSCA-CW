export interface UserProfileDto {
	id: number;
	username: string;
	email: string;
	solutions: [
		{
			id: number;
			query: string;
			solution_time: Date;
			tasks: {
				title: string;
			}
		}
	];
	statistics: [
		{
			score: number;
			tasks_completed: number;
		}
	]
}