import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebtorCreditorComponent } from './debtor-creditor.component';

describe('DebtorCreditorComponent', () => {
  let component: DebtorCreditorComponent;
  let fixture: ComponentFixture<DebtorCreditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DebtorCreditorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DebtorCreditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
