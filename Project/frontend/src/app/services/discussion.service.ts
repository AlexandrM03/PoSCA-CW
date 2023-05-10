import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class DiscussionService {
	constructor(
		private http: HttpClient
	) { }

	public getDiscussions(): Observable<any> {
		return this.http.get('/discussion');
	}

	public createDiscussion(topic: string): Observable<any> {
		return this.http.post('/discussion', {
			topic
		});
	}

	public deleteDuscussion(id: number): Observable<any> {
		return this.http.delete(`/discussion/${id}`);
	}
}
