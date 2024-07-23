import { Routes } from '@angular/router';
import { LayoutDefaultComponent } from './layouts/layout-default/layout-default.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ApplicationsComponent } from './pages/applications/applications.component';
import { GamesComponent } from './pages/games/games.component';
import { ExercisesComponent } from './pages/exercises/exercises.component';

export const routes: Routes = 
[
    { path : '', component : LayoutDefaultComponent, children : 
        [
            { path : 'home', component : HomeComponent, title : 'Home' },
            { path : 'about', component : AboutComponent, title : 'About' },
            { path : 'exercises', component : ExercisesComponent, title : 'Exercises' },
            { path : 'games', component : GamesComponent, title : 'Games' },
            { path : 'applications', component : ApplicationsComponent, title : 'Applications' },
        ]
    },
    { path : '**', redirectTo : 'home'}
];
