import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
	selector: 'app-auth',
	templateUrl: './auth.component.html',
	styleUrls: ['./auth.component.css']
})
export class AuthComponent {
	constructor(
		private authService: AuthService
	) {
		// TODO: if token storage is not empty, redirect to something 
	}

	loginUsername: string = '';
	loginPassword: string = '';

	registerUsername: string = '';
	registerEmail: string = '';
	registerPassword: string = '';

	public login(email: string, password: string) {
		console.log('login', email, password)
	}

	public register(username: string, email: string, password: string) {
		console.log('register', username, email, password)
	}
}
