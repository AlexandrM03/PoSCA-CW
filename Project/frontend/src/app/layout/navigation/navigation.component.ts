import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
	selector: 'app-navigation',
	templateUrl: './navigation.component.html',
	styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
	isLoggedIn = false;
	username = '';
	isAdmin = false;

	constructor(
		private tokenStorage: TokenStorageService
	) { }

	ngOnInit(): void {
		this.isLoggedIn = !!this.tokenStorage.getToken();

		if (this.isLoggedIn) {
			this.isAdmin = this.tokenStorage.isAdmin();
			this.username = this.tokenStorage.getUser();
		}
		console.log(this.username);
	}

	logOut(): void {
		this.tokenStorage.logOut();
	}
}
