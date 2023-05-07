export interface Comment {
	id: number;
	content: string;
	creation_time: Date;
	users: {
		username: string;
	}
}