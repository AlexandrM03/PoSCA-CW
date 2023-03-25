import { IsEmail, IsString, MinLength } from 'class-validator';

export class AuthDto {
	@IsString()
	@MinLength(3, {
		message: 'Username must be at least 3 characters long'
	})
	username: string;

	@IsEmail()
	email: string;

	@MinLength(6, {
		message: 'Password must be at least 6 characters long'
	})
	@IsString()
	password: string;
}