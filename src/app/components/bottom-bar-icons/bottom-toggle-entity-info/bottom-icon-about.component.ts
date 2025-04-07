import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { IconInfoComponent } from '../../../svg-icons/icon-info/icon-info.component';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule, IconInfoComponent],
  selector: 'app-bottom-icon-about',
  templateUrl: './bottom-icon-about.component.html'
})
export class BottomToggleEntityInfoComponent {
  #router = inject(Router)

  public goTo(): void {
    this.#router.navigateByUrl('/about')
  }
}