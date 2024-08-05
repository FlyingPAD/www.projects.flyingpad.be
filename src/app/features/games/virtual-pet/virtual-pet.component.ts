import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VirtualPetService } from '../../../services/virtual-pet.service';
import { Pet } from '../../../models/pet';

@Component({
  selector: 'app-virtual-pet',
  standalone: true,
  templateUrl: './virtual-pet.component.html',
  styleUrls: ['./virtual-pet.component.scss'],
  imports: [CommonModule, FormsModule]
})
export class VirtualPetComponent implements OnInit {
  virtualPetService = inject(VirtualPetService)
  pets: Pet[] = [];
  selectedPet: Pet | null = null;
  message: string = '';



  ngOnInit() {
    this.virtualPetService.pets$.subscribe(pets => this.pets = pets);
    this.virtualPetService.message$.subscribe(message => this.message = message);
  }

  selectPet(petType: string) {
    this.selectedPet = this.virtualPetService.selectPet(petType);
  }

  setName(newName: string) {
    if (this.selectedPet) {
      this.virtualPetService.setName(this.selectedPet.type, newName);
    }
  }

  feed() {
    if (this.selectedPet) {
      this.virtualPetService.feed(this.selectedPet.type);
    }
  }

  play() {
    if (this.selectedPet) {
      this.virtualPetService.play(this.selectedPet.type);
    }
  }

  clean() {
    if (this.selectedPet) {
      this.virtualPetService.clean(this.selectedPet.type);
    }
  }

  restart() {
    this.virtualPetService.restart();
    this.selectedPet = null;
  }

  onImageError(event: any, pet: Pet) {
    event.target.src = 'assets/virtual_pet/placeholder.png'; // Path to a default image
    event.target.alt = ''; // Clear alt text
    console.error(`Image for ${pet.type} not found.`);
  }
}
