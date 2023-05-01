import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './layout/homepage/homepage.component';
import { AuthComponent } from './layout/auth/auth.component';
import { ProfileComponent } from './layout/profile/profile.component';
import { AuthGuardService } from './services/auth-guard.service';
import { ChallengesComponent } from './layout/challenges/challenges.component';
import { ChallengeComponent } from './layout/challenge/challenge.component';

const routes: Routes = [
	{ path: '', component: HomepageComponent },
	{ path: 'auth', component: AuthComponent },
	{ path: 'profile/:username', component: ProfileComponent, canActivate: [AuthGuardService] },
	{ path: 'challenges', component: ChallengesComponent, canActivate: [AuthGuardService] },
	{ path: 'challenges/:id', component: ChallengeComponent, canActivate: [AuthGuardService] },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
