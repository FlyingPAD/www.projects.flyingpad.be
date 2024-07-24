import { Component } from '@angular/core';
import { DiapasonComponent } from "../../features/applications/diapason/diapason.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-applications',
  standalone: true,
  imports: [CommonModule, DiapasonComponent],
  templateUrl: './applications.component.html',
  styleUrl: './applications.component.scss'
})
export class ApplicationsComponent {
  showDiapason: boolean = true

  toggleDiapason() {
    this.resetToggles()
    this.showDiapason = true
  }

  private resetToggles() {
    this.showDiapason = false
  }
}