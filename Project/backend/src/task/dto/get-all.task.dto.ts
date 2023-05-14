import { IsEnum, IsOptional, IsString } from 'class-validator';
import { PagiantionDto } from 'src/pagination/pagination.dto';

export enum EnumTaskSort {
	MOST_SOLVED = 'most-solved',
	LEAST_SOLVED = 'least-solved',
	NEWEST = 'newest',
	OLDEST = 'oldest'
}

export enum EnumTaskComplexitySort {
	EASY = 'easy',
	MEDIUM = 'medium',
	HARD = 'hard',
	ALL = 'all'
}

export class GetAllTaskDto extends PagiantionDto {
	@IsOptional()
	@IsEnum(EnumTaskSort)
	sort?: EnumTaskSort;

	@IsOptional()
	@IsString()
	searchTerm?: string;

	@IsOptional()
	@IsString()
	complexity?: EnumTaskComplexitySort;
}