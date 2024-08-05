export class Pet {
    constructor(
      public type: string,
      public hunger: number,
      public happiness: number,
      public cleanliness: number,
      public name: string = ''
    ) {}
  }