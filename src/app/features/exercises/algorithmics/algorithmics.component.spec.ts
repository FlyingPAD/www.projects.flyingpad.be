import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlgorithmicsComponent } from './algorithmics.component';

describe('AlgorithmicsComponent', () => {
  let component: AlgorithmicsComponent;
  let fixture: ComponentFixture<AlgorithmicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlgorithmicsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlgorithmicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
