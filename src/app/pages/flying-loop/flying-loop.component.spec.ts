import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlyingLoopComponent } from './flying-loop.component';

describe('FlyingLoopComponent', () => {
  let component: FlyingLoopComponent;
  let fixture: ComponentFixture<FlyingLoopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlyingLoopComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlyingLoopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
