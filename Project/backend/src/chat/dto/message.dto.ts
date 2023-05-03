import { IsNumber, IsString, MinLength } from 'class-validator';

export class MessageDto {
	@IsString()
	@MinLength(3, {
		message: 'Message must be at least 3 characters long'
	})
	content: string;

	@IsNumber()
	userId: string;

	@IsNumber()
	discussionId: string;
}