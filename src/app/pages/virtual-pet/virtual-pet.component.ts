import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Pet } from '../../models/pet';
import { BottomBarComponent } from "../../components/bottom-bar/bottom-bar.component";
import { BottomIconBackComponent } from "../../components/bottom-bar-icons/bottom-icon-back/bottom-icon-back.component";
import { BottomToggleEntityInfoComponent } from "../../components/bottom-bar-icons/bottom-toggle-entity-info/bottom-icon-about.component";
import { BottomIconSettingsComponent } from "../../components/bottom-bar-icons/bottom-icon-settings/bottom-icon-settings.component";
import { BottomIconToTopComponent } from "../../components/bottom-bar-icons/bottom-icon-to-top/bottom-icon-to-top.component";
import { SpacerComponent } from "../../components/spacer/spacer.component";

@Component({
  selector: 'app-virtual-pet',
  templateUrl: './virtual-pet.component.html',
  styleUrls: ['./virtual-pet.component.scss'],
  imports: [CommonModule, FormsModule, BottomBarComponent, BottomIconBackComponent, BottomToggleEntityInfoComponent, BottomIconSettingsComponent, BottomIconToTopComponent, SpacerComponent]
})
export class VirtualPetComponent implements OnDestroy {
  petSelection: boolean = false;
  petNaming: boolean = false;
  controlRoom: boolean = false;
  petDetails: boolean = false;
  initialPets: Pet[] = [
    Pet.createPet('monster'),
    Pet.createPet('dog')
  ];
  currentPet!: Pet;
  currentPets: Pet[] = [];
  availableBackgrounds = Pet.availableBackgrounds;

  startSelection() {
    this.petSelection = true;
    this.controlRoom = false;
    this.petNaming = false;
    this.petDetails = false;
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
    this.addPet(this.currentPet);
    this.petNaming = false;
    this.controlRoom = true;
  }

  capitalize(string: string): string {
    if (!string) return '';
    return string.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
  }

  addPet(pet: Pet) {
    if (!this.currentPets.includes(pet)) {
      this.currentPets.push(pet);
    }
  }

  goDetails(pet: Pet) {
    this.currentPet = pet;
    this.controlRoom = false;
    this.petDetails = true;
  }

  goControlRoom() {
    this.petDetails = false;
    this.controlRoom = true;
  }

  changeBackground(background: string) {
    this.currentPet.background = background;
  }

  clonePet(pet: Pet): Pet {
    return Pet.createPet(pet.type);
  }

  trackByPets(index: number, pet: Pet): string {
    return pet.type + pet.name;
  }

  ngOnDestroy() {
    this.currentPets.forEach(pet => pet.clearIntervals());
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