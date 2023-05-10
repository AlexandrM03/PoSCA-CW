import { Component, OnInit } from '@angular/core';
import { CreateTaskDto } from 'src/app/dto/create-task.dto';
import { Schema } from 'src/app/models/schema.model';
import { NotificationService } from 'src/app/services/notification.service';
import { SchemaService } from 'src/app/services/schema.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
	selector: 'app-sandbox',
	templateUrl: './sandbox.component.html',
	styleUrls: ['./sandbox.component.css']
})
export class SandboxComponent implements OnInit {
	editorOptions = { theme: 'vs-dark', language: 'pgsql' };
	public sqlCode: string = '';
	public columns: string[] = [];
	public data: any[] = [];
	public createTaskDto: CreateTaskDto = {
		title: '',
		description: '',
		complexity: '',
		solution: '',
		databaseId: 0
	};
	public difficulties = ['easy', 'medium', 'hard'];
	public schemas: Schema[] = [];

	constructor(
		private taskService: TaskService,
		private schemaService: SchemaService,
		private notificationService: NotificationService
	) { }

	ngOnInit(): void {
		this.schemaService.getAllSchemas().subscribe({
			next: (data: Schema[]) => {
				this.schemas = data;
			},
			error: err => {
				this.notificationService.error('Error during fetching of schemas');
				console.log(err);
			}
		});
	}

	public query(): void {
		const queryToRun = this.sqlCode.replace(/--.*|\/\*[\s\S]*?\*\//gm, '')
			.replace(/(\r\n|\n|\r|\t)/gm, ' ');
		this.taskService.query(queryToRun).subscribe({
			next: (data: any) => {
				if (data.length > 0) {
					this.columns = Object.keys(data[0]);
					this.data = data;
				} else {
					this.notificationService.error('Invalid query');
				}
			},
			error: err => {
				this.notificationService.error('Error during execution of query');
				console.log(err);
			}
		});
	}

	public submit(): void {
		this.createTaskDto.solution = JSON.stringify(this.data);
		if (this.createTaskDto.title === '' || this.createTaskDto.description === ''
			|| this.createTaskDto.complexity === '' || this.createTaskDto.solution.length === 0
			|| this.createTaskDto.databaseId === 0) {
			this.notificationService.error('All fields are required');
		} else {
			this.taskService.create(this.createTaskDto).subscribe({
				next: () => {
					this.notificationService.success('Task created successfully');
				},
				error: err => {
					this.notificationService.error('Error during creation of task');
					console.log(err);
				}
			});

			console.log(this.createTaskDto)
		}
	}
}
