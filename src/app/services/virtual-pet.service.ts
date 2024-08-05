import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, Subscription } from 'rxjs';
import { Pet } from '../models/pet';

@Injectable({
  providedIn: 'root'
})
export class VirtualPetService {
  private petsSubject = new BehaviorSubject<Pet[]>([]);
  private messageSubject = new BehaviorSubject<string>('');
  private subscriptions: Map<string, { hunger: Subscription, happiness: Subscription, cleanliness: Subscription }> = new Map();

  initialPets: Pet[] = [
    new Pet('Monster', 0, 80, 90),
    new Pet('Dog', 10, 100, 80),
    new Pet('Rabbit', 5, 70, 100)
  ];

  constructor() {
    this.startInitialPets();
  }

  private startInitialPets() {
    this.petsSubject.next(this.initialPets.map(pet => ({ ...pet })));
    this.initialPets.forEach(pet => {
      this.startPetSubscriptions(pet);
    });
  }

  private startPetSubscriptions(pet: Pet) {
    const hungerSubscription = interval(2000).subscribe(() => this.updateHunger(pet));
    const happinessSubscription = interval(4000).subscribe(() => this.updateHappiness(pet));
    const cleanlinessSubscription = interval(3000).subscribe(() => this.updateCleanliness(pet));
    this.subscriptions.set(pet.type, { hunger: hungerSubscription, happiness: happinessSubscription, cleanliness: cleanlinessSubscription });
  }

  selectPet(petType: string) {
    const pets = this.petsSubject.value;
    const pet = pets.find(p => p.type === petType);
    return pet || null;
  }

  setName(petType: string, name: string) {
    const pets = this.petsSubject.value;
    const pet = pets.find(p => p.type === petType);
    if (pet && name.trim()) {
      pet.name = name.trim();
      this.petsSubject.next(pets);
    }
  }

  feed(petType: string) {
    const pets = this.petsSubject.value;
    const pet = pets.find(p => p.type === petType);
    if (pet) {
      pet.hunger -= 10;
      if (pet.hunger < 0) pet.hunger = 0;
      this.petsSubject.next(pets);
    }
  }

  play(petType: string) {
    const pets = this.petsSubject.value;
    const pet = pets.find(p => p.type === petType);
    if (pet) {
      pet.happiness += 10;
      if (pet.happiness > 100) pet.happiness = 100;
      this.petsSubject.next(pets);
    }
  }

  clean(petType: string) {
    const pets = this.petsSubject.value;
    const pet = pets.find(p => p.type === petType);
    if (pet) {
      pet.cleanliness += 10;
      if (pet.cleanliness > 100) pet.cleanliness = 100;
      this.petsSubject.next(pets);
    }
  }

  restart() {
    this.clearSubscriptions();
    this.startInitialPets();
  }

  private clearSubscriptions() {
    this.subscriptions.forEach(sub => {
      sub.hunger.unsubscribe();
      sub.happiness.unsubscribe();
      sub.cleanliness.unsubscribe();
    });
    this.subscriptions.clear();
  }

  private updateHunger(pet: Pet) {
    if (pet) {
      pet.hunger += 2;
      if (pet.hunger >= 100) {
        this.messageSubject.next(`Your Virtual Pet ${pet.type} died of hunger.`);
        this.clearSubscriptions();
      }
      this.petsSubject.next([...this.petsSubject.value]);
    }
  }

  private updateHappiness(pet: Pet) {
    if (pet) {
      pet.happiness -= 1;
      if (pet.happiness <= 0) {
        this.messageSubject.next(`Your Virtual Pet ${pet.type} died of sadness.`);
        this.clearSubscriptions();
      }
      this.petsSubject.next([...this.petsSubject.value]);
    }
  }

  private updateCleanliness(pet: Pet) {
    if (pet) {
      pet.cleanliness -= 1;
      if (pet.cleanliness <= 0) {
        this.messageSubject.next(`Your Virtual Pet ${pet.type} died of dirtiness.`);
        this.clearSubscriptions();
      }
      this.petsSubject.next([...this.petsSubject.value]);
    }
  }

  get pets$() {
    return this.petsSubject.asObservable();
  }

  get message$() {
    return this.messageSubject.asObservable();
  }
}
