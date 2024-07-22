import { Component } from '@angular/core';
import { MenuNavigationComponent } from "../../components/menu-navigation/menu-navigation.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-layout-full',
  standalone: true,
  imports: [MenuNavigationComponent, RouterModule],
  templateUrl: './layout-full.component.html',
  styleUrl: './layout-full.component.scss'
})
export class LayoutFullComponent {

}
