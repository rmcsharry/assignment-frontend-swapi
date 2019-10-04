import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BirthYearFilterComponent } from './birth-year-filter.component';

describe('BirthYearFilterComponent', () => {
  let component: BirthYearFilterComponent;
  let fixture: ComponentFixture<BirthYearFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BirthYearFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BirthYearFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
