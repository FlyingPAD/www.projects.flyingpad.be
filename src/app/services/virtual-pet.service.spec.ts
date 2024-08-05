import { TestBed } from '@angular/core/testing';

import { VirtualPetService } from './virtual-pet.service';

describe('VirtualPetService', () => {
  let service: VirtualPetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VirtualPetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
