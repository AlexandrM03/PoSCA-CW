import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Comment } from 'src/app/models/comment.model';
import { Task } from 'src/app/models/task.model';
import { CommentService } from 'src/app/services/comment.service';
import { NotificationService } from 'src/app/services/notification.service';
import { TaskService } from 'src/app/services/task.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
	selector: 'app-challenge',
	templateUrl: './challenge.component.html',
	styleUrls: ['./challenge.component.css']
})
export class ChallengeComponent implements OnInit {
	editorOptions = { theme: 'vs-dark', language: 'pgsql' };
	public task: Task | undefined;
	public comments: Comment[] = [];
	public isTaskLoaded: boolean = false;
	public sqlCode: string = '';
	public columns: string[] = [];
	public data: any[] = [];
	public content: string = '';

	constructor(
		private taskService: TaskService,
		private route: ActivatedRoute,
		private notificationService: NotificationService,
		private commentService: CommentService,
		private tokenStorage: TokenStorageService
	) { }

	ngOnInit(): void {
		this.route.params.subscribe(params => {
			this.taskService.getTask(params['id']).subscribe({
				next: data => {
					this.task = data;
					if (this.task?.solution) {
						this.columns = Object.keys(this.task.solution[0]);
						this.data = this.task.solution;
					}
					this.isTaskLoaded = true;
				},
				error: err => {
					console.log(err);
				}
			});

			this.commentService.getCommentsByTaskId(params['id']).subscribe({
				next: data => {
					this.comments = data;
				},
				error: err => {
					console.log(err);
				}
			});
		});
	}

	public check(): void {
		if (this.task?.solution) {
			this.columns = Object.keys(this.task.solution[0]);
			this.data = this.task.solution;
		}
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
		const queryToRun = this.sqlCode.replace(/--.*|\/\*[\s\S]*?\*\//gm, '')
			.replace(/(\r\n|\n|\r|\t)/gm, ' ');
		this.taskService.check(this.task!.id, queryToRun).subscribe({
			next: (data: any) => {
				if (data.success) {
					this.notificationService.success(data.message);
				} else {
					this.notificationService.error(data.message);
				}
			}
		});
	}

	public createComment(): void {
		if (this.content.trim()) {
			this.commentService.createComment(this.content, this.tokenStorage.getUserId(), this.task!.id).subscribe({
				next: (comment: Comment) => {
					this.comments.unshift(comment);
					this.content = '';
				},
				error: err => {
					this.notificationService.error(err.message);
					console.log(err);
				}
			})
		}
	}
}
