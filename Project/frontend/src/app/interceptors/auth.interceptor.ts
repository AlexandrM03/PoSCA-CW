import { Injectable } from '@angular/core';
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor,
	HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../services/token-storage.service';

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable({
	providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

	constructor(
		private tokenStorage: TokenStorageService
	) { }

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		let authRequest = req;
		const token = this.tokenStorage.getToken();
		if (token != null) {
			authRequest = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, `Bearer ${token}`) });
		}

		return next.handle(authRequest);
	}
}

export const authInterceptorProviders = [
	{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];