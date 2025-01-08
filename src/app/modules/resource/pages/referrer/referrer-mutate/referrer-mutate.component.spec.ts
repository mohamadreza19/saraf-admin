import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferrerMutateComponent } from './referrer-mutate.component';

describe('ReferrerMutateComponent', () => {
  let component: ReferrerMutateComponent;
  let fixture: ComponentFixture<ReferrerMutateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReferrerMutateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReferrerMutateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
