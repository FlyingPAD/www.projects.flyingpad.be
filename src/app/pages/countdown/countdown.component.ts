import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CountdownEvent } from '../../interfaces/countdown-event';

type CountdownValue = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

type EventDefinition = {
  id: number;
  name: string;
  thumbnail: string;
  month: number;
  day: number;
};

@Component({
  selector: 'app-countdown',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './countdown.component.html',
  styleUrl: './countdown.component.scss'
})
export class CountdownComponent implements OnInit, OnDestroy {
  #intervalId: ReturnType<typeof setInterval> | undefined;
  #targetTime: Date | null = null;

  readonly #eventDefinitions: EventDefinition[] = [
    { id: 1, name: 'New Year', thumbnail: 'newyear.webp', month: 0, day: 1 },
    { id: 2, name: "Valentine's Day", thumbnail: 'valentines.webp', month: 1, day: 14 },
    { id: 3, name: 'Carnival', thumbnail: 'carnival.webp', month: 2, day: 4 },
    { id: 4, name: 'Halloween', thumbnail: 'halloween.webp', month: 9, day: 31 },
    { id: 5, name: 'Christmas', thumbnail: 'christmas.webp', month: 11, day: 25 }
  ];

  public countdown: CountdownValue = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  };

  public countdownMessage = 'Time remaining';
  public currentEventName = '';
  public selectedTargetDate: Date | null = null;
  public selectedImage: string | null = null;
  public customDate = '';
  public isCustomTarget = false;
  public isPast = false;
  public events: CountdownEvent[] = [];

  public ngOnInit(): void {
    this.events = this.#buildEvents();
    this.#setNextActiveEvent();
  }

  public ngOnDestroy(): void {
    this.#stopCountdown();
  }

  #buildEvents(): CountdownEvent[] {
    const now = new Date();

    return this.#eventDefinitions.map(definition => {
      let date = new Date(
        now.getFullYear(),
        definition.month,
        definition.day,
        0,
        0,
        0,
        0
      );

      if (date.getTime() <= now.getTime()) {
        date = new Date(
          now.getFullYear() + 1,
          definition.month,
          definition.day,
          0,
          0,
          0,
          0
        );
      }

      return {
        id: definition.id,
        name: definition.name,
        thumbnail: definition.thumbnail,
        date,
        isActive: false
      };
    });
  }

  #setNextActiveEvent(): void {
    const nextEvent = [...this.events].sort(
      (a, b) => a.date.getTime() - b.date.getTime()
    )[0];

    if (nextEvent) {
      this.#selectTarget(nextEvent.date, nextEvent.id, nextEvent.name, nextEvent.thumbnail);
    }
  }

  #selectTarget(
    targetDate: Date,
    eventId: number,
    eventName: string,
    thumbnail: string | null
  ): void {
    this.#targetTime = new Date(targetDate);
    this.selectedTargetDate = new Date(targetDate);
    this.currentEventName = eventName;
    this.selectedImage = thumbnail ? `assets/events/${thumbnail}` : null;
    this.isCustomTarget = eventId === -1;

    this.events = this.events.map(event => ({
      ...event,
      isActive: event.id === eventId
    }));

    this.#updateCountdown();
    this.#stopCountdown();
    this.#intervalId = setInterval(() => this.#updateCountdown(), 1000);
  }

  #updateCountdown(): void {
    if (!this.#targetTime) return;

    const diff = this.#targetTime.getTime() - Date.now();
    const absoluteSeconds = Math.floor(Math.abs(diff) / 1000);

    this.isPast = diff < 0;
    this.countdownMessage = this.isPast ? 'Time since' : 'Time remaining';

    this.countdown = {
      days: Math.floor(absoluteSeconds / 86400),
      hours: Math.floor((absoluteSeconds % 86400) / 3600),
      minutes: Math.floor((absoluteSeconds % 3600) / 60),
      seconds: absoluteSeconds % 60
    };
  }

  #stopCountdown(): void {
    if (!this.#intervalId) return;

    clearInterval(this.#intervalId);
    this.#intervalId = undefined;
  }

  #parseLocalDate(value: string): Date | null {
    const [year, month, day] = value.split('-').map(Number);

    if (!year || !month || !day) return null;

    const date = new Date(year, month - 1, day, 0, 0, 0, 0);

    if (
      date.getFullYear() !== year ||
      date.getMonth() !== month - 1 ||
      date.getDate() !== day
    ) {
      return null;
    }

    return date;
  }

  public handleDateChange(): void {
    if (!this.customDate) {
      this.resetToNextEvent();
      return;
    }

    const date = this.#parseLocalDate(this.customDate);
    if (!date) return;

    this.#selectTarget(date, -1, 'Custom date', null);
  }

  public handleEventClick(event: CountdownEvent): void {
    this.customDate = '';
    this.#selectTarget(event.date, event.id, event.name, event.thumbnail);
  }

  public resetToNextEvent(): void {
    this.customDate = '';
    this.isCustomTarget = false;
    this.#setNextActiveEvent();
  }
}
