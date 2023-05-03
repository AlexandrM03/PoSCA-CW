import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Discussion } from 'src/app/models/discussion.model';
import { DiscussionService } from 'src/app/services/discussion.service';
import { DiscussionDialogComponent } from '../discussion-dialog/discussion-dialog.component';

@Component({
	selector: 'app-discussions',
	templateUrl: './discussions.component.html',
	styleUrls: ['./discussions.component.css']
})
export class DiscussionsComponent implements OnInit {
	public discussions: Discussion[] = [];

	constructor(
		private discussionService: DiscussionService,
		private dialog: MatDialog
	) { }

	ngOnInit(): void {
		this.discussionService.getDiscussions().subscribe((discussions: Discussion[]) => {
			this.discussions = discussions;
		});
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
}
