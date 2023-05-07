import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class CommentService {
	constructor(
		private http: HttpClient
	) { }

	public getCommentsByTaskId(taskId: number): Observable<any> {
		return this.http.get(`/comment/${taskId}`);
	}

	public createComment(content: string, userId: number, taskId: number): Observable<any> {
		return this.http.post('/comment', {
			content,
			userId,
			taskId
		})
	}
}
