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

	public deleteComment(commentId: number): Observable<any> {
		return this.http.delete(`/comment/${commentId}`);
	}

	public reportComment(commentId: number): Observable<any> {
		return this.http.put(`/comment/${commentId}`, {});
	}

	public rejectReport(commentId: number): Observable<any> {
		return this.http.put(`/comment/${commentId}/reject`, {});
	}

	public getReportedComments(): Observable<any> {
		return this.http.get('/comment/reported');
	}
}
