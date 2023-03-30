import { IsEnum, IsOptional, IsString } from 'class-validator';
import { PagiantionDto } from 'src/pagination/pagination.dto';

export enum EnumTaskSort {
	MOST_SOLVED = 'most-solved',
	LEAST_SOLVED = 'least-solved',
	NEWEST = 'newest',
	OLDEST = 'oldest'
}

export class GetAllTaskDto extends PagiantionDto {
	@IsOptional()
	@IsEnum(EnumTaskSort)
	sort?: EnumTaskSort;

	@IsOptional()
	@IsString()
	searchTerm?: string;
}