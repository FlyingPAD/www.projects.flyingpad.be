import { Component, OnDestroy, OnInit } from '@angular/core';
import { AboutComponent } from '../../features/home/about/about.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, AboutComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  showAbout: boolean = false;
  showSquare: boolean = false;
  intervalId!: any;

  toggleShowAbout(): void {
    this.showAbout = !this.showAbout;
  }

  ngOnInit(): void {
    this.startSquare();
  }

  ngOnDestroy(): void {
    this.stopSquare();
  }

  startSquare(): void {
    if (!this.intervalId) {
      this.intervalId = setInterval(() => {
        this.showSquare = !this.showSquare;
      }, 500);
    }
  }

  stopSquare(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}