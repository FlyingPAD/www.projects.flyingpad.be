import { Component, OnDestroy } from '@angular/core';
import { ProjectShellComponent } from '../../components/project-shell/project-shell.component';

type ReactionState = 'idle' | 'waiting' | 'ready' | 'result' | 'too-soon';

@Component({
  selector: 'app-reaction-time',
  imports: [ProjectShellComponent],
  templateUrl: './reaction-time.component.html',
  styleUrl: './reaction-time.component.scss'
})
export class ReactionTimeComponent implements OnDestroy {
  state: ReactionState = 'idle';
  reactionTime: number | null = null;
  bestTime: number | null = null;

  private readyAt = 0;
  private timer: ReturnType<typeof setTimeout> | null = null;

  start(): void {
    this.clearTimer();
    this.reactionTime = null;
    this.state = 'waiting';

    const delay = 1600 + Math.random() * 2800;
    this.timer = setTimeout(() => {
      this.readyAt = performance.now();
      this.state = 'ready';
      this.timer = null;
    }, delay);
  }

  react(): void {
    if (this.state === 'waiting') {
      this.clearTimer();
      this.state = 'too-soon';
      return;
    }

    if (this.state !== 'ready') {
      return;
    }

    this.reactionTime = Math.round(performance.now() - this.readyAt);
    this.bestTime = this.bestTime === null
      ? this.reactionTime
      : Math.min(this.bestTime, this.reactionTime);
    this.state = 'result';
  }

  ngOnDestroy(): void {
    this.clearTimer();
  }

  private clearTimer(): void {
    if (this.timer !== null) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }
}
