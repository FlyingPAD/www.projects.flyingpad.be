import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { BottomBarComponent } from '../../components/bottom-bar/bottom-bar.component';
import { BottomToggleEntityInfoComponent } from "../../components/bottom-bar-icons/bottom-toggle-entity-info/bottom-icon-about.component";
import { BottomIconSettingsComponent } from "../../components/bottom-bar-icons/bottom-icon-settings/bottom-icon-settings.component";

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [TranslateModule, RouterModule, BottomBarComponent, BottomToggleEntityInfoComponent, BottomIconSettingsComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {

}