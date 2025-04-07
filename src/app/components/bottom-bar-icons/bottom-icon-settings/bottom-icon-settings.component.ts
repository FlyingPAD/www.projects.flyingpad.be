import { Component, inject } from '@angular/core';
import { IconSettingsComponent } from "../../../svg-icons/icon-settings/icon-settings.component";
import { Router } from '@angular/router';

@Component({
    selector: 'app-bottom-icon-settings',
    imports: [IconSettingsComponent],
    templateUrl: './bottom-icon-settings.component.html'
})
export class BottomIconSettingsComponent {
  #router = inject(Router)

  public goTo(): void {
    this.#router.navigateByUrl('/settings')
  }
}