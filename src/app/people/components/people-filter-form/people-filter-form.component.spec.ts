import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleFilterFormComponent } from './people-filter-form.component';

describe('PeopleFilterFormComponent', () => {
  let component: PeopleFilterFormComponent;
  let fixture: ComponentFixture<PeopleFilterFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeopleFilterFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeopleFilterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
