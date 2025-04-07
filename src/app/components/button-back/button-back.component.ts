import { Component, inject } from '@angular/core'
import { Location } from '@angular/common'
import { TranslateModule } from '@ngx-translate/core'

@Component({
    selector: 'app-button-back',
    imports: [TranslateModule],
    templateUrl: './button-back.component.html',
    styleUrls: ['./button-back.component.scss']
})
export class ButtonBackComponent {
  #location = inject(Location)

  public goBack(): void {
    this.#location.back()
  }
}