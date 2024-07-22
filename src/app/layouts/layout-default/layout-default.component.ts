import { Component } from '@angular/core';
import { MenuNavigationComponent } from '../../components/menu-navigation/menu-navigation.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-layout-default',
  standalone: true,
  imports: [MenuNavigationComponent, RouterModule],
  templateUrl: './layout-default.component.html',
  styleUrl: './layout-default.component.scss'
})
export class LayoutDefaultComponent {

}
