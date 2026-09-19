import { Component } from '@angular/core';
import { ProjectShellComponent } from '../../components/project-shell/project-shell.component';

@Component({
  selector: 'app-about',
  imports: [ProjectShellComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {}
