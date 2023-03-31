import { IsJSON, IsNumber, IsOptional, IsString, MinLength } from 'class-validator';

export class TaskDto {
	@IsNumber()
	id: number;

	@IsString()
	@MinLength(3, {
		message: 'Title must be at least 3 characters long'
	})
	title: string;

	@IsString()
	@MinLength(10, {
		message: 'Description must be at least 10 characters long'
	})
	description: string;

	@IsString()
	complexity: string;

	@IsJSON()
	solution: object;
}