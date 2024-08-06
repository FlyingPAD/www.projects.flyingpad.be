import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Pet } from '../../../models/pet';
import { ButtonTopComponent } from '../../../components/button-top/button-top.component';

@Component({
  selector: 'app-virtual-pet',
  standalone: true,
  templateUrl: './virtual-pet.component.html',
  styleUrls: ['./virtual-pet.component.scss'],
  imports: [CommonModule, FormsModule, ButtonTopComponent]
})
export class VirtualPetComponent implements OnDestroy {
  petSelection: boolean = false;
  petNaming: boolean = false;
  controlRoom: boolean = false;
  petDetails: boolean = false;
  initialPets: Pet[] = [
    new Pet('Monster', 100, 0, 100, '', 'roar ?'),
    new Pet('Dog', 100, 0, 100, '', 'Wif wif !'),
  ];
  currentPet!: Pet;
  currentPets: Pet[] = [];
  private happinessInterval: any;
  private hungerInterval: any;
  private cleanlinessInterval: any;

  startSelection() {
    this.petSelection = true;
    this.controlRoom = false;
  }

  SelectPet(pet: Pet) {
    this.currentPet = this.clonePet(pet);
    this.petSelection = false;
    this.petNaming = true;
  }

  setName(newName: string) {
    if (this.currentPet) {
      this.currentPet.name = this.capitalize(newName);
    }
    this.currentPet.updateDialog();
    this.petNaming = false;
    this.controlRoom = true;
  }

  capitalize(string: string) {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

  addPet(pet: Pet) {
    this.currentPets.push(pet);
  }

  goDetails(pet: Pet) {
    this.currentPet = pet;
    this.controlRoom = false;
    this.petDetails = true;
    this.startConsumption();
  }

  goControlRoom() {
    this.petDetails = false;
    this.controlRoom = true;
    this.clearIntervals();
  }

  clonePet(pet: Pet): Pet {
    return new Pet(pet.type, pet.happiness, pet.hunger, pet.cleanliness, pet.name, pet.dialog);
  }

  startConsumption() {
    this.clearIntervals();

    this.happinessInterval = setInterval(() => {
      if(!this.currentPet.isDead) this.currentPet.decreaseHappiness();
    }, 1000);

    this.hungerInterval = setInterval(() => {
      if(!this.currentPet.isDead) this.currentPet.increaseHunger();
    }, 2000);

    this.cleanlinessInterval = setInterval(() => {
      if(!this.currentPet.isDead) this.currentPet.decreaseCleanliness();
    }, 3000);
  }

  clearIntervals() {
    if (this.happinessInterval) {
      clearInterval(this.happinessInterval);
    }
    if (this.hungerInterval) {
      clearInterval(this.hungerInterval);
    }
    if (this.cleanlinessInterval) {
      clearInterval(this.cleanlinessInterval);
    }
  }

  ngOnDestroy() {
    this.clearIntervals();
  }

  feedPet(pet: Pet) {
    pet.feed();
  }

  cleanPet(pet: Pet) {
    pet.clean();
  }

  playPet(pet: Pet) {
    pet.play();
  }
}
