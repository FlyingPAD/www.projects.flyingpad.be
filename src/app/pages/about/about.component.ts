import { Component } from '@angular/core';
import { ButtonBackComponent } from '../../components/button-back/button-back.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [ButtonBackComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {

}
