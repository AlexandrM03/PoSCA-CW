import { IsArray, IsJSON, IsNumber, IsOptional, IsString, MinLength, ValidateNested } from 'class-validator';

export class TaskDto {
	@IsOptional()
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

	// @IsArray()
	// @ValidateNested({ each: true })
	@IsString()
	solution: string;
}

export enum EnumTaskComplexity {
	EASY = 'easy',
	MEDIUM = 'medium',
	HARD = 'hard'
}