import { IsOptional, IsString } from 'class-validator';

export class PagiantionDto {
	@IsString()
	@IsOptional()
	page?: string;

	@IsOptional()
	@IsString()
	perPage?: string;
}