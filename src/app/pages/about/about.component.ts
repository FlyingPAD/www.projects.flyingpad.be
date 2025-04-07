import { Component } from '@angular/core';
import { ButtonBackComponent } from '../../components/button-back/button-back.component';
import { BottomBarComponent } from "../../components/bottom-bar/bottom-bar.component";
import { BottomIconBackComponent } from "../../components/bottom-bar-icons/bottom-icon-back/bottom-icon-back.component";
import { BottomIconSettingsComponent } from "../../components/bottom-bar-icons/bottom-icon-settings/bottom-icon-settings.component";
import { BottomToggleEntityInfoComponent } from "../../components/bottom-bar-icons/bottom-toggle-entity-info/bottom-icon-about.component";

@Component({
    selector: 'app-about',
    imports: [ButtonBackComponent, BottomBarComponent, BottomIconBackComponent, BottomIconSettingsComponent, BottomToggleEntityInfoComponent],
    templateUrl: './about.component.html',
    styleUrl: './about.component.scss'
})
export class AboutComponent {

}