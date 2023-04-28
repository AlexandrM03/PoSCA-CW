import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	constructor(
		private http: HttpClient
	) { }

	public login(user: User): Observable<any> {
		return this.http.post('/login', user);
	}

	public register(user: User): Observable<any> {
		return this.http.post('/register', user);
	}
}
