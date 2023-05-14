import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskSortDto } from '../dto/task-sort.dto';
import { CreateTaskDto } from '../dto/create-task.dto';

@Injectable({
	providedIn: 'root'
})
export class TaskService {
	constructor(
		private http: HttpClient
	) { }

	public getTasks(dto: TaskSortDto): Observable<any> {
		const { sort, searchTerm, complexity, page } = dto;
		let params = new HttpParams();
		if (sort) {
			params = params.append('sort', sort);
		}
		if (searchTerm) {
			params = params.append('searchTerm', searchTerm);
		}
		if (complexity) {
			params = params.append('complexity', complexity);
		}
		if (page) {
			params = params.append('page', page.toString());
		}

		return this.http.get('/task', { params });
	}

	public create(dto: CreateTaskDto): Observable<any> {
		return this.http.post('/task', dto);
	}

	public getIdsOfSolvedTasks(): Observable<any> {
		return this.http.get('/task/solved');
	}

	public getUnconfirmedTasks(): Observable<any> {
		return this.http.get('/task/unconfirmed');
	}

	public confirm(id: number): Observable<any> {
		return this.http.put(`/task/${id}`, {});
	}

	public reject(id: number): Observable<any> {
		return this.http.delete(`/task/${id}`, {});
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
