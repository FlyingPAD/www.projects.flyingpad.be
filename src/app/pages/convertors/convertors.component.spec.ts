import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvertorsComponent } from './convertors.component';

describe('ConvertorsComponent', () => {
  let component: ConvertorsComponent;
  let fixture: ComponentFixture<ConvertorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConvertorsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConvertorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
