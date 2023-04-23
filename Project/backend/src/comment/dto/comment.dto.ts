import { IsNumber, IsString, MinLength } from 'class-validator';

export class CommentDto {
	@IsString()
	@MinLength(3, {
		message: 'Content must be at least 3 characters long'
	})
	content: string;

	@IsNumber()
	userId: number;

	@IsNumber()
	taskId: number;
}