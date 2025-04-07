import { Component, inject } from '@angular/core';
import { Location } from '@angular/common'
import { IconBackComponent } from "../../../svg-icons/icon-back/icon-back.component";

@Component({
  selector: 'app-bottom-icon-back',
  imports: [IconBackComponent],
  templateUrl: './bottom-icon-back.component.html'
})
export class BottomIconBackComponent {
  #location = inject(Location)

  public goBack(): void {
    this.#location.back()
  }
}