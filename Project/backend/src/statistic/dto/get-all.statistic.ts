import { IsEnum, IsOptional } from 'class-validator';
import { PagiantionDto } from 'src/pagination/pagination.dto';

export enum EnumStatisticSort {
	MOST_SOLVED = 'most-solved',
	MOST_SCORE = 'most-score'
}

export class GetAllStatisticDto extends PagiantionDto {
	@IsOptional()
	@IsEnum(EnumStatisticSort)
	sort?: EnumStatisticSort;
}