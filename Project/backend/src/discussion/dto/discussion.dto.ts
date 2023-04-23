import { IsString, MinLength } from 'class-validator';

export class DiscussionDto {
	@IsString()
	@MinLength(3, {
		message: 'Topic must be at least 3 characters long'
	})
	topic: string;
}