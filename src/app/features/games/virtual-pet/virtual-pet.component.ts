import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export class Pet {
  constructor(
    public type: string,
    public hunger: number,
    public happiness: number,
    public cleanliness: number
  ) {}
}

@Component({
  selector: 'app-virtual-pet',
  standalone: true,
  templateUrl: './virtual-pet.component.html',
  styleUrls: ['./virtual-pet.component.scss'],
  imports: [CommonModule, FormsModule]
})
export class VirtualPetComponent implements OnInit, OnDestroy {
  name: string = '';
  pet: Pet | null = null;
  isAlive = true;
  isNamed = false;
  message: string = '';
  isSelected = false;

  private hungerInterval: any;
  private happinessInterval: any;
  private cleanlinessInterval: any;

  pets: Pet[] = [
    new Pet('Monster', 0, 80, 90),
    new Pet('Dog', 10, 100, 80),
    new Pet('Rabbit', 5, 70, 100)
  ];

  selectPet(pet: Pet) {
    this.pet = pet;
    this.isSelected = true;
    this.isNamed = false; // Reset isNamed
    this.name = ''; // Reset the name
    this.isAlive = true; // Ensure pet is alive when selected
    this.clearIntervals();
    this.startIntervals(); // Start intervals for the selected pet
  }

  setName(newName: string) {
    if (newName.trim()) {
      this.name = newName.trim();
      this.isNamed = true;
      this.message = ''; // Reset message
    }
  }

  feed() {
    if (this.isAlive && this.pet) {
      this.pet.hunger -= 10;
      if (this.pet.hunger < 0) this.pet.hunger = 0;
    }
  }

  play() {
    if (this.isAlive && this.pet) {
      this.pet.happiness += 10;
      if (this.pet.happiness > 100) this.pet.happiness = 100;
    }
  }

  clean() {
    if (this.isAlive && this.pet) {
      this.pet.cleanliness += 10;
      if (this.pet.cleanliness > 100) this.pet.cleanliness = 100;
    }
  }

  updateHunger() {
    if (this.isAlive && this.pet) {
      this.pet.hunger += 2; // Update every 2 seconds
      if (this.pet.hunger >= 100) {
        this.isAlive = false;
        this.message = 'Your Virtual Pet died of hunger.';
        this.clearIntervals(); // Stop intervals when pet is dead
      }
    }
  }

  updateHappiness() {
    if (this.isAlive && this.pet) {
      this.pet.happiness -= 1; // Update every 4 seconds
      if (this.pet.happiness <= 0) {
        this.isAlive = false;
        this.message = 'Your Virtual Pet died of sadness.';
        this.clearIntervals(); // Stop intervals when pet is dead
      }
    }
  }

  updateCleanliness() {
    if (this.isAlive && this.pet) {
      this.pet.cleanliness -= 1; // Update every 3 seconds
      if (this.pet.cleanliness <= 0) {
        this.isAlive = false;
        this.message = 'Your Virtual Pet died of dirtiness.';
        this.clearIntervals(); // Stop intervals when pet is dead
      }
    }
  }

  restart() {
    this.pet = null;
    this.isAlive = true;
    this.isNamed = false;
    this.isSelected = false;
    this.name = '';
    this.message = '';
    this.clearIntervals();
  }

  startIntervals() {
    this.hungerInterval = setInterval(() => this.updateHunger(), 2000); // Update every 2 seconds
    this.happinessInterval = setInterval(() => this.updateHappiness(), 4000); // Update every 4 seconds
    this.cleanlinessInterval = setInterval(() => this.updateCleanliness(), 3000); // Update every 3 seconds
  }

  clearIntervals() {
    if (this.hungerInterval) clearInterval(this.hungerInterval);
    if (this.happinessInterval) clearInterval(this.happinessInterval);
    if (this.cleanlinessInterval) clearInterval(this.cleanlinessInterval);
  }

  onImageError(event: any, pet: Pet) {
    event.target.src = 'assets/virtual_pet/placeholder.png'; // Path to a default image
    event.target.alt = ''; // Clear alt text
    console.error(`Image for ${pet.type} not found.`);
  }

  ngOnInit() {
    this.startIntervals();
  }

  ngOnDestroy() {
    this.clearIntervals();
  }
}
