import { Component } from '@angular/core';
import { AboutComponent } from '../../features/home/about/about.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, AboutComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  showAbout : boolean = false

  toggleShowAbout(): void{
    this.showAbout = !this.showAbout
  }
}