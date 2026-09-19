import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-project-shell',
  imports: [RouterLink],
  templateUrl: './project-shell.component.html'
})
export class ProjectShellComponent {
  @Input() accent = '#9abcc9';
  @Input() footerLabel = '';
  @Input() chromatic = false;
  @Input() showProjectsLink = true;
}
