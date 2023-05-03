import { Component, OnInit } from '@angular/core';
import { Discussion } from 'src/app/models/discussion.model';
import { DiscussionService } from 'src/app/services/discussion.service';

@Component({
	selector: 'app-discussions',
	templateUrl: './discussions.component.html',
	styleUrls: ['./discussions.component.css']
})
export class DiscussionsComponent implements OnInit {
	public discussions: Discussion[] = [];

	constructor(
		private discussionService: DiscussionService
	) { }

	ngOnInit(): void {
		this.discussionService.getDiscussions().subscribe((discussions: Discussion[]) => {
			this.discussions = discussions;
		});
	}
}
