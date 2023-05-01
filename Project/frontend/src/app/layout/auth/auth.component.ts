import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
	selector: 'app-auth',
	templateUrl: './auth.component.html',
	styleUrls: ['./auth.component.css']
})
export class AuthComponent {
	constructor(
		private authService: AuthService,
		private tokenStorage: TokenStorageService,
		private notificationService: NotificationService,
		private router: Router
	) {
		// TODO: if token storage is not empty, redirect to something 
	}

	loginUsername: string = '';
	loginPassword: string = '';

	registerUsername: string = '';
	registerEmail: string = '';
	registerPassword: string = '';

	public login(email: string, password: string) {
		this.authService.login(email, password).subscribe({
			next: data => {
				this.tokenStorage.saveToken(data.accessToken);
				this.tokenStorage.saveUser(data.user);

				this.router.navigate(['/profile', data.user.username]);
			},
			error: err => {
				this.notificationService.error(err.message);
				console.log(err);
			}
		});
	}

	public register(username: string, email: string, password: string) {
		console.log(username, email, password);
		this.authService.register(username, email, password).subscribe({
			next: data => {
				this.tokenStorage.saveToken(data.accessToken);
				this.tokenStorage.saveUser(data.user);

				this.router.navigate(['/']);
			},
			error: err => {
				this.notificationService.error(err.message);
				console.log(err);
			}
		});
	}
}
