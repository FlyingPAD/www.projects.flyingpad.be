import { Routes } from '@angular/router';
import { LayoutFullComponent } from './layouts/layout-full/layout-full.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';

export const routes: Routes = 
[
    { path : '', component : LayoutFullComponent, children : 
        [
            { path : 'home', component : HomeComponent, title : 'Home'},
            { path : 'about', component : AboutComponent, title : 'About'},
        ]
    },
    { path : '**', redirectTo : 'home' }
];