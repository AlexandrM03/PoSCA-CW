import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './layout/homepage/homepage.component';
import { AuthComponent } from './layout/auth/auth.component';
import { ProfileComponent } from './layout/profile/profile.component';
import { AuthGuardService } from './services/auth-guard.service';
import { ChallengesComponent } from './layout/challenges/challenges.component';
import { ChallengeComponent } from './layout/challenge/challenge.component';
import { ChatComponent } from './layout/chat/chat.component';
import { DiscussionsComponent } from './layout/discussions/discussions.component';
import { StatisticComponent } from './layout/statistic/statistic.component';
import { SandboxComponent } from './layout/sandbox/sandbox.component';
import { CommentsComponent } from './layout/comments/comments.component';

const routes: Routes = [
	{ path: '', component: HomepageComponent },
	{ path: 'auth', component: AuthComponent },
	{ path: 'profile/:username', component: ProfileComponent, canActivate: [AuthGuardService] },
	{ path: 'challenges', component: ChallengesComponent, canActivate: [AuthGuardService] },
	{ path: 'challenges/:id', component: ChallengeComponent, canActivate: [AuthGuardService] },
	{ path: 'discussions', component: DiscussionsComponent, canActivate: [AuthGuardService] },
	{ path: 'discussions/:id', component: ChatComponent, canActivate: [AuthGuardService] },
	{ path: 'leaderboard', component: StatisticComponent, canActivate: [AuthGuardService] },
	{ path: 'sandbox', component: SandboxComponent, canActivate: [AuthGuardService] },
	{ path: 'comments', component: CommentsComponent, canActivate: [AuthGuardService] }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
