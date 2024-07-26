import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HigherOrLowerComponent } from './higher-or-lower.component';

describe('HigherOrLowerComponent', () => {
  let component: HigherOrLowerComponent;
  let fixture: ComponentFixture<HigherOrLowerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HigherOrLowerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HigherOrLowerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
