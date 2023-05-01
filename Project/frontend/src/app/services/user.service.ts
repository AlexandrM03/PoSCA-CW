import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class UserService {
	constructor(
		private http: HttpClient
	) { }

	public getUserProfile(username: string): Observable<any> {
		return this.http.get(`/user/${username}`);
	}
}
