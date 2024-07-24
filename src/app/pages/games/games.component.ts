import { Component } from '@angular/core';
import { StoryComponent } from '../../features/games/story/story.component';

@Component({
  selector: 'app-games',
  standalone: true,
  imports: [StoryComponent],
  templateUrl: './games.component.html',
  styleUrl: './games.component.scss'
})
export class GamesComponent {

}
