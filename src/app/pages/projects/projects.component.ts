import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProjectShellComponent } from '../../components/project-shell/project-shell.component';

type ProjectCard = {
  index: string;
  name: string;
  detail: string;
  tone: string;
  route: string;
};

@Component({
  selector: 'app-projects',
  imports: [RouterLink, ProjectShellComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {
  readonly projects: ProjectCard[] = [
    { index: '02', name: 'Countdowns', detail: 'Dates & timers', tone: 'red', route: '/countdowns' },
    { index: '03', name: 'Convertors', detail: 'Small utility tools', tone: 'orange', route: '/convertors' },
    { index: '04', name: 'Virtual Pet', detail: 'State & interaction', tone: 'yellow', route: '/virtual-pet' },
    { index: '05', name: 'Higher / Lower', detail: 'Guess the number', tone: 'green', route: '/guess-the-right-number' },
    { index: '06', name: 'Flying Loop', detail: 'Interactive music', tone: 'blue', route: '/flying-loop' },
    { index: '07', name: 'Dice Roll', detail: 'Turn-based mini game', tone: 'indigo', route: '/dice-roll' },
    { index: '08', name: 'Leap Year', detail: 'Date logic', tone: 'violet', route: '/leap-year' },
    { index: '09', name: 'Reaction Time', detail: 'Timing challenge', tone: 'black', route: '/reaction-time' }
  ];
}
