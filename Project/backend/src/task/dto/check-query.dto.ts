import { IsOptional, IsString } from 'class-validator';

export class CheckQueryDto {
	@IsString()
	query: string;
}