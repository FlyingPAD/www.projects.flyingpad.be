export class Pet {
  private happinessInterval: any;
  private hungerInterval: any;
  private cleanlinessInterval: any;
  static availableBackgrounds: { [key: string]: string[] } = {
    monster: ['space', 'beach', 'forest', 'house', 'yard'],
    dog: ['niche', 'house', 'yard', 'beach', 'forest']
  };

  constructor(
    public type: string,
    public happiness: number,
    public hunger: number,
    public cleanliness: number,
    public name: string = '',
    public dialog: string = '',
    public background: string = '',
    public isDead: boolean = false
  ) {
    this.background = Pet.availableBackgrounds[type][0];
    this.updateDialog();
    this.startConsumption();
  }

  static createPet(type: string): Pet {
    return new Pet(type, 100, 0, 100, '', type === 'monster' ? 'roar ?' : 'Wif wif !');
  }

  checkLimits() {
    if (this.happiness <= 0 || this.hunger >= 100 || this.cleanliness <= 0) {
      this.isDead = true;
      this.updateDialog();
      this.clearIntervals();
    }
  }

  decreaseHappiness() {
    if (this.happiness > 0) {
      this.happiness -= 1;
      this.updateState();
    }
  }

  increaseHunger() {
    if (this.hunger < 100) {
      this.hunger += 1;
      this.updateState();
    }
  }

  decreaseCleanliness() {
    if (this.cleanliness > 0) {
      this.cleanliness -= 1;
      this.updateState();
    }
  }

  feed() {
    if (!this.isDead) {
      this.hunger = Math.max(0, this.hunger - 15);
      this.happiness = Math.min(100, this.happiness + 3);
      this.updateState();
    }
  }

  clean() {
    if (!this.isDead) {
      this.cleanliness = Math.min(100, this.cleanliness + 15);
      this.happiness = Math.min(100, this.happiness + 3);
      this.updateState();
    }
  }

  play() {
    if (!this.isDead) {
      this.happiness = Math.min(100, this.happiness + 15);
      this.updateState();
    }
  }

  getImageUrl(): string {
    if (this.isDead) {
      return `assets/virtual_pet/${this.type.toLowerCase()}_dead.png`;
    } else if (this.hunger > 75) {
      return `assets/virtual_pet/${this.type.toLowerCase()}_very_hungry.png`;
    } else if (this.cleanliness < 25) {
      return `assets/virtual_pet/${this.type.toLowerCase()}_very_dirty.png`;
    } else if (this.happiness < 25) {
      return `assets/virtual_pet/${this.type.toLowerCase()}_very_sad.png`;
    } else if (this.hunger > 50) {
      return `assets/virtual_pet/${this.type.toLowerCase()}_hungry.png`;
    } else if (this.cleanliness < 50) {
      return `assets/virtual_pet/${this.type.toLowerCase()}_dirty.png`;
    } else if (this.happiness < 50) {
      return `assets/virtual_pet/${this.type.toLowerCase()}_sad.png`;
    } else if (this.happiness >= 75) {
      return `assets/virtual_pet/${this.type.toLowerCase()}_very_happy.png`;
    } else if (this.happiness >= 50) {
      return `assets/virtual_pet/${this.type.toLowerCase()}_happy.png`;
    } else {
      return `assets/virtual_pet/${this.type.toLowerCase()}_normal.png`;
    }
  }

  getBackgroundUrl(): string {
    return `assets/virtual_pet/back-${this.background}.png`;
  }

  updateDialog() {
    if (this.isDead) {
      this.dialog = `${this.name} is dead.`;
    } else {
      let messages = [];
      if (this.happiness < 25) {
        messages.push(`${this.name} is very sad.`);
      } else if (this.happiness < 50) {
        messages.push(`${this.name} is a bit down.`);
      } else if (this.happiness >= 85) {
        messages.push(`${this.name} is very happy!`);
      } else if (this.happiness >= 50) {
        messages.push(`${this.name} is happy.`);
      }
  
      if (this.hunger > 75) {
        messages.push(`${this.name} is very hungry.`);
      } else if (this.hunger > 50) {
        messages.push(`${this.name} is hungry.`);
      }
  
      if (this.cleanliness < 25) {
        messages.push(`${this.name} needs a bath.`);
      } else if (this.cleanliness < 50) {
        messages.push(`${this.name} is a bit dirty.`);
      }

      if (messages.length === 0) {
        messages.push(`is okay!`);
      }

      this.dialog = messages.join(' ');
    }
  }

  updateState() {
    this.checkLimits();
    this.updateDialog();
  }

  startConsumption() {
    this.clearIntervals();

    this.happinessInterval = setInterval(() => {
      if (!this.isDead) this.decreaseHappiness();
    }, 1000);

    this.hungerInterval = setInterval(() => {
      if (!this.isDead) this.increaseHunger();
    }, 2000);

    this.cleanlinessInterval = setInterval(() => {
      if (!this.isDead) this.decreaseCleanliness();
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
}
