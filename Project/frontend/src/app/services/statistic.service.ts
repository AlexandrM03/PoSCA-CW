import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class StatisticService {
	constructor(
		private http: HttpClient
	) { }

	public getStatistic(): Observable<any> {
		return this.http.get('/statistic');
	}
}
