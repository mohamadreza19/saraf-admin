import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleMutateComponent } from './module-mutate.component';

describe('ModuleMutateComponent', () => {
  let component: ModuleMutateComponent;
  let fixture: ComponentFixture<ModuleMutateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModuleMutateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModuleMutateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
