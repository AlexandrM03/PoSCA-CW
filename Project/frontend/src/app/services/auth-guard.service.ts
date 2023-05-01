import { Injectable } from '@angular/core';
import { TokenStorageService } from './token-storage.service';
import { Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class AuthGuardService {
	constructor(
		private tokenStorage: TokenStorageService,
		private router: Router
	) { }

	canActivate():
		| Observable<boolean | UrlTree>
		| Promise<boolean | UrlTree>
		| boolean
		| UrlTree {
		if (this.tokenStorage.getToken()) {
			return true;
		} else {
			this.router.navigate(['/auth']);
			return false;
		}
	}
}
