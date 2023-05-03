import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Discussion } from 'src/app/models/discussion.model';
import { DiscussionService } from 'src/app/services/discussion.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
	selector: 'app-discussion-dialog',
	templateUrl: './discussion-dialog.component.html',
	styleUrls: ['./discussion-dialog.component.css']
})
export class DiscussionDialogComponent implements OnInit {
	form: FormGroup;
	topic: string = '';

	constructor(
		private dialogRef: MatDialogRef<DiscussionDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		private discussionService: DiscussionService,
		private notificationService: NotificationService
	) {
		this.form = new FormGroup({});
	}

	ngOnInit(): void {
		this.form = new FormGroup({
			topic: new FormControl('', Validators.required)
		});
	}

	onSubmit(): void {
		this.discussionService.createDiscussion(this.topic).subscribe({
			next: (discussion: Discussion) => {
				this.dialogRef.close(discussion);
			},
			error: (err: any) => {
				this.notificationService.error(err.message);
			}
		});
	}

	onCancel(): void {
		this.dialogRef.close();
	}
}
