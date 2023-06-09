import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskSortDto } from 'src/app/dto/task-sort.dto';
import { Task } from 'src/app/models/task.model';
import { TaskService } from 'src/app/services/task.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
	selector: 'app-challenges',
	templateUrl: './challenges.component.html',
	styleUrls: ['./challenges.component.css']
})
export class ChallengesComponent implements OnInit {
	public tasks: Task[] | undefined;
	public idsOfSolvedTasks: number[] = [];
	public isTasksLoaded: boolean = false;
	public sort: TaskSortDto;
	public isAdmin: boolean = false;
	public length: number = 0;

	constructor(
		private taskService: TaskService,
		private tokenStorage: TokenStorageService,
		private router: Router
	) {
		this.sort = {
			sort: 'most-solved',
			searchTerm: '',
			complexity: 'all',
			page: 1
		};
	}

	ngOnInit(): void {
		this.isAdmin = this.tokenStorage.isAdmin();

		if (this.isAdmin) {
			this.taskService.getUnconfirmedTasks().subscribe({
				next: data => {
					this.tasks = data;
					this.isTasksLoaded = true;
				},
				error: err => {
					console.log(err);
				}
			});
		} else {
			this.taskService.getTasks(this.sort).subscribe({
				next: data => {
					this.tasks = data.tasks;
					this.length = data.length;
					this.isTasksLoaded = true;
				},
				error: err => {
					console.log(err);
				}
			});

			this.taskService.getIdsOfSolvedTasks().subscribe({
				next: data => {
					this.idsOfSolvedTasks = data;
				},
				error: err => {
					console.log(err);
				}
			});
		}
	}

	public onSortChange(): void {
		this.getTasks();
	}

	public onSearch(): void {
		this.getTasks();
	}

	public nextPage(): void {
		this.sort.page++;
		this.getTasks();
	}

	public prevPage(): void {
		this.sort.page--;
		this.getTasks();
	}

	public onComplexityChange(): void {
		this.getTasks();
	}

	public getTasks(): void {
		this.taskService.getTasks(this.sort).subscribe({
			next: data => {
				this.tasks = data.tasks;
				this.length = data.length;
			},
			error: err => {
				console.log(err);
			}
		});
	}

	public getColor(complexity: string) {
		switch (complexity) {
			case 'easy': return 'green';
			case 'medium': return 'orange';
			case 'hard': return 'red';
			default: return 'black';
		}
	}
}
