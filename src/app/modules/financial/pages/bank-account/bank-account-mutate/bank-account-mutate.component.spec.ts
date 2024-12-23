import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankAccountMutateComponent } from './bank-account-mutate.component';

describe('BankAccountMutateComponent', () => {
  let component: BankAccountMutateComponent;
  let fixture: ComponentFixture<BankAccountMutateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BankAccountMutateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BankAccountMutateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
