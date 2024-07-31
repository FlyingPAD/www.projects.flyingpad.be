import { Component } from '@angular/core';
import { DiapasonComponent } from "../../features/applications/diapason/diapason.component";
import { CommonModule } from '@angular/common';
import { FlyingKeysMiniComponent } from "../../features/applications/flying-keys-mini/flying-keys-mini.component";
import { slideInAnimation } from '../../animations/animations';
import { TunerComponent } from '../../features/applications/tuner/tuner.component';

@Component({
  selector: 'app-applications',
  standalone: true,
  imports: [CommonModule, DiapasonComponent, FlyingKeysMiniComponent, TunerComponent],
  templateUrl: './applications.component.html',
  styleUrl: './applications.component.scss',
  animations: [slideInAnimation]
})
export class ApplicationsComponent {
  currentApp: string = 'tuner'

  selectGame(appName: string) {
    this.currentApp = appName
  }
}