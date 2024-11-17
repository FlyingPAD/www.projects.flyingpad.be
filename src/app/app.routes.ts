import { Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { LeapYearComponent } from './pages/leap-year/leap-year.component';
import { HigherOrLowerComponent } from './pages/higher-or-lower/higher-or-lower.component';
import { ConvertorsComponent } from './pages/convertors/convertors.component';
import { DiceRollComponent } from './pages/dice-roll/dice-roll.component';
import { VirtualPetComponent } from './pages/virtual-pet/virtual-pet.component';
import { CountdownComponent } from './pages/countdown/countdown.component';

export const routes: Routes = 
[ 
    { path: '', redirectTo: 'projects', pathMatch: 'full' },
    { path : 'projects', component : ProjectsComponent, title : 'Projects' },
    { path : 'about', component : AboutComponent, title : 'About' },
    { path : 'settings', component : SettingsComponent, title : 'Settings' },
    { path : 'leap-year', component : LeapYearComponent, title : 'Projects | Leap Year' },
    { path : 'guess-the-right-number', component : HigherOrLowerComponent, title : 'Projects | Guess the right Number' },
    { path : 'convertors', component : ConvertorsComponent, title : 'Projects | Convertors' },
    { path : 'dice-roll', component : DiceRollComponent, title : 'Projects | Dice Roll' },
    { path : 'virtual-pet', component : VirtualPetComponent, title : 'Projects | Virtual Pet' },
    { path : 'countdowns', component : CountdownComponent, title : 'Projects | Countdowns' },
    { path : '**', redirectTo : 'projects'}
]