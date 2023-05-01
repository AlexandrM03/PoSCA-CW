import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomepageComponent } from './layout/homepage/homepage.component';
import { NavigationComponent } from './layout/navigation/navigation.component';
import { authInterceptorProviders } from './interceptors/auth.interceptor';
import { errorInterceptorProviders } from './interceptors/error.interceptor';
import { ChallengesComponent } from './layout/challenges/challenges.component';
import { apiInterceptorProviders } from './interceptors/api.interceptor';
import { AuthComponent } from './layout/auth/auth.component';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';
import { ProfileComponent } from './layout/profile/profile.component';
import { ChallengeComponent } from './layout/challenge/challenge.component';
import { HIGHLIGHT_OPTIONS, HighlightModule } from 'ngx-highlightjs';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';

@NgModule({
	declarations: [
		AppComponent,
		HomepageComponent,
		NavigationComponent,
		ChallengesComponent,
		AuthComponent,
		ProfileComponent,
		ChallengeComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		MatButtonModule,
		HttpClientModule,
		NgbModule,
		FormsModule,
		MatSnackBarModule,
		MatMenuModule,
		HighlightModule,
		MonacoEditorModule.forRoot()
	],
	providers: [authInterceptorProviders, errorInterceptorProviders, apiInterceptorProviders,
		{
			provide: HIGHLIGHT_OPTIONS,
			useValue: {
				coreLibraryLoader: () => import('highlight.js/lib/core'),
				languages: {
					sql: () => import('highlight.js/lib/languages/sql')
				}
			}
		}],
	bootstrap: [AppComponent]
})
export class AppModule { }
