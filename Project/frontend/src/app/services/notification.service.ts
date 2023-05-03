import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
	providedIn: 'root'
})
export class NotificationService {
	constructor(
		private snackbar: MatSnackBar
	) { }

	public error(message: string) {
		this.snackbar.open(message, 'OK', {
			duration: 3000
		});
	}

	public success(message: string) {
		this.snackbar.open(message, '✅', {
			duration: 3000,
			panelClass: ['success'],
			verticalPosition: 'top'
		});
	}
}
