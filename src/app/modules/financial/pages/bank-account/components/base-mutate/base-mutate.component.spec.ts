import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseMutateComponent } from './base-mutate.component';

describe('BaseMutateComponent', () => {
  let component: BaseMutateComponent;
  let fixture: ComponentFixture<BaseMutateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaseMutateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BaseMutateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
