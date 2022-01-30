import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MoviesComponent } from './components/movies/movies.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';


const routes: Routes = [
    { path: 'movies', component: MoviesComponent },
     { path: 'profile', component: UserProfileComponent },
    { path: '', redirectTo: '/movies', pathMatch: 'full' },
    { path: '**', redirectTo: '/movies', pathMatch: 'full' }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes, { useHash: true }) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule { }
