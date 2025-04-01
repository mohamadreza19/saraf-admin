import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CryptocurrencyBankAccountComponent } from './cryptocurrency-bank-account.component';

describe('CryptocurrencyBankAccountComponent', () => {
  let component: CryptocurrencyBankAccountComponent;
  let fixture: ComponentFixture<CryptocurrencyBankAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CryptocurrencyBankAccountComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CryptocurrencyBankAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
