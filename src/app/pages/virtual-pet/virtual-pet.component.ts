import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Pet } from '../../models/pet';

@Component({
  selector: 'app-virtual-pet',
  templateUrl: './virtual-pet.component.html',
  styleUrl: './virtual-pet.component.scss',
  imports: [CommonModule, FormsModule, RouterLink]
})
export class VirtualPetComponent implements OnDestroy {
  petSelection = false;
  petNaming = false;
  controlRoom = false;
  petDetails = false;
  initialPets: Pet[] = [Pet.createPet('monster'), Pet.createPet('dog')];
  currentPet!: Pet;
  currentPets: Pet[] = [];
  availableBackgrounds = Pet.availableBackgrounds;

  startSelection(): void {
    this.petSelection = true;
    this.controlRoom = false;
    this.petNaming = false;
    this.petDetails = false;
  }

  SelectPet(pet: Pet): void {
    this.currentPet = this.clonePet(pet);
    this.petSelection = false;
    this.petNaming = true;
  }

  setName(newName: string): void {
    if (this.currentPet) this.currentPet.name = this.capitalize(newName);
    this.currentPet.updateDialog();
    this.addPet(this.currentPet);
    this.petNaming = false;
    this.controlRoom = true;
  }

  capitalize(string: string): string {
    if (!string) return '';
    return string.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
  }

  addPet(pet: Pet): void {
    if (!this.currentPets.includes(pet)) this.currentPets.push(pet);
  }

  goDetails(pet: Pet): void {
    this.currentPet = pet;
    this.controlRoom = false;
    this.petDetails = true;
  }

  goControlRoom(): void {
    this.petDetails = false;
    this.controlRoom = true;
  }

  changeBackground(background: string): void {
    this.currentPet.background = background;
  }

  clonePet(pet: Pet): Pet {
    return Pet.createPet(pet.type);
  }

  trackByPets(index: number, pet: Pet): string {
    return pet.type + pet.name;
  }

  ngOnDestroy(): void {
    this.currentPets.forEach(pet => pet.clearIntervals());
  }

  feedPet(pet: Pet): void { pet.feed(); }
  cleanPet(pet: Pet): void { pet.clean(); }
  playPet(pet: Pet): void { pet.play(); }
}
