export interface ChatMessageDto {
	content: string;
	creation_time: Date;
	users: {
		username: string;
	}
}