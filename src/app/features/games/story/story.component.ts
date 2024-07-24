import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

export interface Character {
  name: string;
  mood: Mood;
  stamina: number;
}

export interface Dialogue {
  text: string;
  responses: Response[];
}

export interface Response {
  text: string;
  nextDialogueId: string | null;
}

export enum Mood {
  Happy = "heureux",
  Sad = "triste",
  Angry = "en colère",
  Neutral = "neutre"
}

@Component({
  selector: 'app-story',
  standalone: true,
  imports : [CommonModule],
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss']
})
export class StoryComponent {
  character: Character = {
    name: "Alex",
    mood: Mood.Neutral,
    stamina: 10
  };

  dialogues: { [key: string]: Dialogue } = {
    'start': {
      text: 'Bonjour, je ne crois pas que nous nous sommes déjà rencontrés. Comment puis-je vous aider aujourd’hui ?',
      responses: [
        { text: 'Parlez-moi plus de vous.', nextDialogueId: 'moreInfo' },
        { text: 'Rien, merci.', nextDialogueId: null }
      ]
    },
    'moreInfo': {
      text: 'Je suis un assistant virtuel conçu pour aider avec diverses tâches. Qu’aimeriez-vous savoir d’autre ?',
      responses: [
        { text: 'Que pouvez-vous faire ?', nextDialogueId: 'capabilities' },
        { text: 'Cela suffit pour le moment.', nextDialogueId: null }
      ]
    },
    'capabilities': {
      text: 'Je peux vous aider avec de nombreux problèmes. Avez-vous besoin d’aide pour quelque chose de spécifique ?',
      responses: [
        { text: 'Oui, j’ai un problème avec mon ordinateur.', nextDialogueId: null },
        { text: 'Non, merci pour les informations.', nextDialogueId: null }
      ]
    }
  };

  currentDialogue: Dialogue | null = this.dialogues['start']; // Starting dialogue

  handleResponse(response: Response): void {
    if (response.nextDialogueId) {
      this.currentDialogue = this.dialogues[response.nextDialogueId];
    } else {
      this.currentDialogue = null; // End conversation
    }
  }
}
