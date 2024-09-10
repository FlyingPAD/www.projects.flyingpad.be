import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  showSquare: boolean = false;
  intervalId!: any;

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