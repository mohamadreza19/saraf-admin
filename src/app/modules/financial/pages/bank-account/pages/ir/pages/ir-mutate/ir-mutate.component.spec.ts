import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IrMutateComponent } from './ir-mutate.component';

describe('IrMutateComponent', () => {
  let component: IrMutateComponent;
  let fixture: ComponentFixture<IrMutateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IrMutateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IrMutateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
