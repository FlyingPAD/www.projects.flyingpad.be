import { Component } from '@angular/core';
import { DiapasonComponent } from "../../features/applications/diapason/diapason.component";
import { CommonModule } from '@angular/common';
import { FlyingKeysMiniComponent } from "../../features/applications/flying-keys-mini/flying-keys-mini.component";
import { slideInAnimation } from '../../animations/animations';

@Component({
  selector: 'app-applications',
  standalone: true,
  imports: [CommonModule, DiapasonComponent, FlyingKeysMiniComponent],
  templateUrl: './applications.component.html',
  styleUrl: './applications.component.scss',
  animations: [slideInAnimation]
})
export class ApplicationsComponent {
  currentApp: string = 'keyboard'

  selectGame(appName: string) {
    this.currentApp = appName
  }
}