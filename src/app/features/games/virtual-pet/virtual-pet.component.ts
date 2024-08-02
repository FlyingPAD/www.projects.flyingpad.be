import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-virtual-pet',
  standalone: true,
  templateUrl: './virtual-pet.component.html',
  styleUrls: ['./virtual-pet.component.scss'],
  imports: [CommonModule, FormsModule]
})
export class VirtualPetComponent {
  name: string = '';
  hunger = 0;
  happiness = 100;
  cleanliness = 100;
  isAlive = true;
  isNamed = false;

  setName(newName: string) {
    this.name = newName;
    this.isNamed = true;
  }

  feed() {
    if (this.isAlive) {
      this.hunger -= 10;
      if (this.hunger < 0) this.hunger = 0;
    }
  }

  play() {
    if (this.isAlive) {
      this.happiness += 10;
      if (this.happiness > 100) this.happiness = 100;
    }
  }

  clean() {
    if (this.isAlive) {
      this.cleanliness += 10;
      if (this.cleanliness > 100) this.cleanliness = 100;
    }
  }

  update() {
    if (this.isAlive) {
      this.hunger += 5;
      this.happiness -= 5;
      this.cleanliness -= 5;

      if (this.hunger >= 100 || this.happiness <= 0 || this.cleanliness <= 0) {
        this.isAlive = false;
        alert('Votre Virtual Pet est mort.');
      }
    }
  }

  restart() {
    this.hunger = 0;
    this.happiness = 100;
    this.cleanliness = 100;
    this.isAlive = true;
    this.isNamed = false;
    this.name = '';
  }

  ngOnInit() {
    setInterval(() => this.update(), 1000);
  }
}
