import { IsNumber, IsString, MinLength } from 'class-validator';

export class ChatDto {
	@IsString()
	@MinLength(3, {
		message: 'Message must be at least 3 characters long'
	})
	content: string;

	@IsNumber()
	discussionId: number;

	@IsNumber()
	userId: number;
}