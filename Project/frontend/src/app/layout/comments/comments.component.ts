import { Component, OnInit } from '@angular/core';
import { Comment } from 'src/app/models/comment.model';
import { CommentService } from 'src/app/services/comment.service';

@Component({
	selector: 'app-comments',
	templateUrl: './comments.component.html',
	styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
	constructor(
		private commentService: CommentService
	) { }

	public comments: Comment[] = [];

	ngOnInit(): void {
		this.commentService.getReportedComments().subscribe({
			next: (comments: Comment[]) => {
				this.comments = comments;
			},
			error: (err: any) => {
				console.error(err);
			}
		})
	}

	public deleteComment(commentId: number): void {
		this.commentService.deleteComment(commentId).subscribe({
			next: () => {
				this.comments = this.comments.filter(comment => comment.id !== commentId);
			},
			error: (err: any) => {
				console.error(err);
			}
		})
	}

	public rejectReport(commentId: number): void {
		this.commentService.rejectReport(commentId).subscribe({
			next: () => {
				this.comments = this.comments.filter(comment => comment.id !== commentId);
			},
			error: (err: any) => {
				console.error(err);
			}
		})
	}
}
