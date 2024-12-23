import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchSelectInputComponent } from './search-select-input.component';

describe('SearchSelectInputComponent', () => {
  let component: SearchSelectInputComponent;
  let fixture: ComponentFixture<SearchSelectInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchSelectInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchSelectInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
