import { TestBed } from '@angular/core/testing';

import { AudioLoopService } from './audio-loop.service';

describe('AudioLoopService', () => {
  let service: AudioLoopService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AudioLoopService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
