import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
	providedIn: 'root'
})
export class TokenStorageService {
	constructor() { }

	public saveToken(token: string): void {
		window.sessionStorage.removeItem(TOKEN_KEY);
		window.sessionStorage.setItem(TOKEN_KEY, token);
	}

	public getToken(): string | null {
		return window.sessionStorage.getItem(TOKEN_KEY);
	}

	public saveUser(user: any): void {
		window.sessionStorage.removeItem(USER_KEY);
		window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
	}

	public getUser(): any {
		return JSON.parse(window.sessionStorage.getItem(USER_KEY)?.toString() || '{}').username;
	}

	public getUserId(): any {
		return JSON.parse(window.sessionStorage.getItem(USER_KEY)?.toString() || '{}').id;
	}

	public getUserRole(): any {
		return JSON.parse(window.sessionStorage.getItem(USER_KEY)?.toString() || '{}').role;
	}

	public isAdmin(): boolean {
		return this.getUserRole() == 1;
	}

	public logOut(): void {
		window.sessionStorage.clear();
		window.location.reload();
	}
}
