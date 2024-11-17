import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonBackComponent } from '../../components/button-back/button-back.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [TranslateModule, RouterModule, ButtonBackComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {

}