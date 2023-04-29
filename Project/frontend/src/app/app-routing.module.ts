import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './layout/homepage/homepage.component';
import { AuthComponent } from './layout/auth/auth.component';

const routes: Routes = [
	{ path: '', component: HomepageComponent },
	{ path: 'auth', component: AuthComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
