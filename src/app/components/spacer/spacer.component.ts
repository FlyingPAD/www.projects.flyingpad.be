import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-spacer',
  imports: [CommonModule],
  templateUrl: './spacer.component.html'
})
export class SpacerComponent {
  @Input() height: string = '150px'
}