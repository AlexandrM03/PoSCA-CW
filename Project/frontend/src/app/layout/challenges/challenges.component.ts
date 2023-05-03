import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskSortDto } from 'src/app/dto/task-sort.dto';
import { Task } from 'src/app/models/task.model';
import { TaskService } from 'src/app/services/task.service';

@Component({
	selector: 'app-challenges',
	templateUrl: './challenges.component.html',
	styleUrls: ['./challenges.component.css']
})
export class ChallengesComponent implements OnInit {
	public tasks: Task[] | undefined;
	public isTasksLoaded: boolean = false;
	public sort: TaskSortDto;

	constructor(
		private taskService: TaskService,
		private router: Router
	) {
		this.sort = {
			sort: 'most-solved',
			searchTerm: ''
		};
	}

	ngOnInit(): void {
		this.taskService.getTasks(this.sort).subscribe({
			next: data => {
				this.tasks = data;
				this.isTasksLoaded = true;
			},
			error: err => {
				console.log(err);
			}
		});
	}

	public onSortChange(): void {
		this.taskService.getTasks(this.sort).subscribe({
			next: data => {
				this.tasks = data;
			},
			error: err => {
				console.log(err);
			}
		});
	}

	public onSearch(): void {
		this.taskService.getTasks(this.sort).subscribe({
			next: data => {
				this.tasks = data;
			},
			error: err => {
				console.log(err);
			}
		});
	}
}
