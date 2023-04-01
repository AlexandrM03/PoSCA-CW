import { IsNumber, IsOptional, IsString } from 'class-validator';

export class TaskQueryDto {
	@IsOptional()
	@IsNumber()
	id?: number;

	@IsString()
	query: string;
}