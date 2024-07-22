import { Routes } from '@angular/router';
import { LayoutDefaultComponent } from './layouts/layout-default/layout-default.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';

export const routes: Routes = 
[
    { path : '', component : LayoutDefaultComponent, children : 
        [
            { path : 'home', component : HomeComponent, title : 'Home' },
            { path : 'about', component : AboutComponent, title : 'About' },
        ]
    },
    { path : '**', redirectTo : 'home'}
];
