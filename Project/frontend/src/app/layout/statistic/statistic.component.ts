import { Component } from '@angular/core';
import { Statistic } from 'src/app/models/statistic.model';
import { StatisticService } from 'src/app/services/statistic.service';
import { OnInit } from '@angular/core';

@Component({
	selector: 'app-statistic',
	templateUrl: './statistic.component.html',
	styleUrls: ['./statistic.component.css']
})
export class StatisticComponent implements OnInit {
	public statistic: Statistic[] = [];

	constructor(
		private statisticService: StatisticService
	) { }

	ngOnInit(): void {
		this.statisticService.getStatistic().subscribe((data: Statistic[]) => {
			this.statistic = data;
		});
	}
}
