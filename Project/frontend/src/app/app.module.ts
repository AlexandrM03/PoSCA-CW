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

@NgModule({
	declarations: [
		AppComponent,
		HomepageComponent,
		NavigationComponent,
		ChallengesComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		MatButtonModule
	],
	providers: [authInterceptorProviders, errorInterceptorProviders, apiInterceptorProviders],
	bootstrap: [AppComponent]
})
export class AppModule { }
