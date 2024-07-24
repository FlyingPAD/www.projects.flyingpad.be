import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Events {
  id: number;
  name: string;
  thumbnail: string;
  date: Date;
  isActive: boolean;
}

@Component({
  selector: 'app-countdown',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss']
})
export class CountdownComponent implements OnInit, OnDestroy {
  intervalId: ReturnType<typeof setInterval> | undefined = undefined;
  targetTime!: Date;
  countdown!: { months: number, days: number, hours: number, minutes: number, seconds: number };
  currentEventName: string | null = null;

  events: Events[] = [
    { id: 1, name: 'New Year', thumbnail: 'newyear.webp', date: new Date('2025-01-01'), isActive: false },
    { id: 2, name: 'Valentine\'s Day', thumbnail: 'valentines.webp', date: new Date('2025-02-14'), isActive: false },
    { id: 3, name: 'Carnival', thumbnail: 'carnival.webp', date: new Date('2025-03-04'), isActive: false },
    { id: 4, name: 'Halloween', thumbnail: 'halloween.webp', date: new Date('2024-10-31'), isActive: false },
    { id: 5, name: 'Christmas', thumbnail: 'christmas.webp', date: new Date('2024-12-25'), isActive: false },
  ];

  ngOnInit(): void {
    this.updateEventDates();
    this.setNextActiveEvent();
  }

  ngOnDestroy(): void {
    this.stopCountDown();
  }

  updateEventDates(): void {
    const currentYear = new Date().getFullYear();
    const currentTime = new Date().getTime();
    this.events = this.events.map(event => {
      let date = new Date(event.date);
      if (date.getFullYear() < currentYear || (date.getFullYear() === currentYear && date.getTime() < currentTime)) {
        date.setFullYear(currentYear + 1);
      }
      return { ...event, date: new Date(date) };
    });
  }

  setNextActiveEvent(): void {
    const now = new Date().getTime();
    const nextEvent = this.events
      .filter(event => event.date.getTime() > now)
      .sort((a, b) => a.date.getTime() - b.date.getTime())[0];

    if (nextEvent) {
      this.setTargetDate(nextEvent.date, nextEvent.id, nextEvent.name);
    }
  }

  setTargetDate(targetDate: Date, eventId: number, eventName: string): void {
    this.targetTime = targetDate;
    this.currentEventName = eventName;
    this.events = this.events.map(event => ({
      ...event,
      isActive: event.id === eventId
    }));
    this.updateCountdown();
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    this.startCountDown();
  }

  updateCountdown(): void {
    const now = new Date();
    const timeDiff = this.targetTime.getTime() - now.getTime();

    const totalDays = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const months = Math.floor(totalDays / 30); // Approximative
    const days = totalDays % 30;

    this.countdown = {
      months: months,
      days: days,
      hours: Math.floor((timeDiff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((timeDiff / 1000 / 60) % 60),
      seconds: Math.floor((timeDiff / 1000) % 60)
    };
  }

  startCountDown(): void {
    this.intervalId = setInterval(() => {
      this.updateCountdown();
      if (this.targetTime.getTime() <= new Date().getTime()) {
        clearInterval(this.intervalId);
        this.countdown = { months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
      }
    }, 1000);
  }

  stopCountDown(): void {
    clearInterval(this.intervalId);
    this.intervalId = undefined;
  }
}
