import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { BottomBarComponent } from '../../components/bottom-bar/bottom-bar.component';
import { BottomToggleEntityInfoComponent } from "../../components/bottom-bar-icons/bottom-toggle-entity-info/bottom-icon-about.component";
import { BottomIconSettingsComponent } from "../../components/bottom-bar-icons/bottom-icon-settings/bottom-icon-settings.component";
import { BottomIconToTopComponent } from "../../components/bottom-bar-icons/bottom-icon-to-top/bottom-icon-to-top.component";
import { SpacerComponent } from "../../components/spacer/spacer.component";

@Component({
    selector: 'app-projects',
    imports: [TranslateModule, RouterModule, BottomBarComponent, BottomToggleEntityInfoComponent, BottomIconSettingsComponent, BottomIconToTopComponent, SpacerComponent],
    templateUrl: './projects.component.html'
})
export class ProjectsComponent {

}