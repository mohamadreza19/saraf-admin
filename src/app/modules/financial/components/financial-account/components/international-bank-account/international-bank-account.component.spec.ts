import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternationalBankAccountComponent } from './international-bank-account.component';

describe('InternationalBankAccountComponent', () => {
  let component: InternationalBankAccountComponent;
  let fixture: ComponentFixture<InternationalBankAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InternationalBankAccountComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InternationalBankAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
