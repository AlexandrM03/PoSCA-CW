import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserProfileDto } from 'src/app/dto/user-profile.dto';
import { UserService } from 'src/app/services/user.service';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
	public userProfile: UserProfileDto | undefined;
	public isUserProfileLoaded: boolean = false;

	constructor(
		private userService: UserService,
		private route: ActivatedRoute
	) { }

	ngOnInit(): void {
		this.route.params.subscribe(params => {
			this.userService.getUserProfile(params['username']).subscribe(params => {
				this.userService.getUserProfile(params['username']).subscribe({
					next: data => {
						this.userProfile = data;
						this.isUserProfileLoaded = true;
					},
					error: err => {
						console.log(err);
					}
				});
			});
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
