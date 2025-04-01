import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSkeletonsComponent } from './form-skeletons.component';

describe('FormSkeletonsComponent', () => {
  let component: FormSkeletonsComponent;
  let fixture: ComponentFixture<FormSkeletonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormSkeletonsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormSkeletonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
