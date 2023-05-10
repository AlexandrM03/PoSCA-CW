import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class SchemaService {
	constructor(
		private http: HttpClient
	) { }

	public getSchema(taskId: number): Observable<any> {
		return this.http.get(`/schema/${taskId}`, { responseType: 'blob' });
	}
}
