import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiInterceptor implements HttpInterceptor {
	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const apiReq = req.clone({ url: `https://leetbattles-api.onrender.com/api${req.url}` });
		return next.handle(apiReq);
	}
}

export const apiInterceptorProviders = [
	{ provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true }
];