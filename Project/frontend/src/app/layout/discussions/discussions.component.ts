import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Discussion } from 'src/app/models/discussion.model';
import { DiscussionService } from 'src/app/services/discussion.service';
import { DiscussionDialogComponent } from '../discussion-dialog/discussion-dialog.component';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
	selector: 'app-discussions',
	templateUrl: './discussions.component.html',
	styleUrls: ['./discussions.component.css']
})
export class DiscussionsComponent implements OnInit {
	public discussions: Discussion[] = [];
	public isAdmin: boolean = false;

	constructor(
		private discussionService: DiscussionService,
		private tokenStorage: TokenStorageService,
		private notificationService: NotificationService,
		private dialog: MatDialog
	) { }

	ngOnInit(): void {
		this.discussionService.getDiscussions().subscribe((discussions: Discussion[]) => {
			this.discussions = discussions;
		});
		this.isAdmin = this.tokenStorage.isAdmin();
	}

	openDialog(): void {
		const dialogRef = this.dialog.open(DiscussionDialogComponent, {
			width: '500px'
		});

		dialogRef.afterClosed().subscribe(result => {
			if (result) {
				this.discussions.push(result);
			}
		});
	}

	deleteDiscussion(discussionId: number): void {
		this.discussionService.deleteDuscussion(discussionId).subscribe({
			next: () => {
				this.notificationService.success('Discussion deleted successfully');
				this.discussions = this.discussions.filter((discussion: Discussion) => discussion.id !== discussionId);
			},
			error: (err) => {
				console.error(err);
			}
		});
	}
}
