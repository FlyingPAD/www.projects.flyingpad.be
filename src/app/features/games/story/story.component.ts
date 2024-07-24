import { Component } from '@angular/core';

export interface Character {
  name: string
  message: string
  stage: number
}

export interface Action {
  name: string
  file: string
}

export interface Order {
  name: string
  stage: number
}

@Component({
  selector: 'app-story',
  standalone: true,
  imports: [],
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss']
})
export class StoryComponent {
  character: Character = {
    name: 'Robert',
    message: 'Salut !',
    stage: 1
  };

  actions: Action[] = [
    { name: 'Action 1', file : '' },
  ]
  orders: Order[] = [
    { name: 'Order 1', stage: 1 },
  ]
}