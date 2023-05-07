import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskSortDto } from '../dto/task-sort.dto';

@Injectable({
	providedIn: 'root'
})
export class TaskService {
	constructor(
		private http: HttpClient
	) { }

	public getTasks(dto: TaskSortDto): Observable<any> {
		const { sort, searchTerm } = dto;
		let params = new HttpParams();
		if (sort) {
			params = params.append('sort', sort);
		}
		if (searchTerm) {
			params = params.append('searchTerm', searchTerm);
		}

		return this.http.get('/task', { params });
	}

	public getIdsOfSolvedTasks(): Observable<any> {
		return this.http.get('/task/solved');
	}

	public getTask(id: string): Observable<any> {
		return this.http.get(`/task/${id}`);
	}

	public check(id: number, query: string) {
		return this.http.post(`/task/check`, {
			id,
			query
		});
	}

	public query(query: string) {
		return this.http.post(`/task/query`, {
			query
		});
	}
}
