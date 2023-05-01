import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	constructor(
		private http: HttpClient
	) { }

	public login(email: string, password: string): Observable<any> {
		console.log('login', email, password)
		return this.http.post('/auth/login', {
			email,
			password
		});
	}

	public register(username: string, email: string, password: string): Observable<any> {
		return this.http.post('/auth/register', {
			username,
			email,
			password
		});
	}
}
