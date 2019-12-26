import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditableDropdownListComponent } from './editable-dropdown-list.component';

describe('EditableDropdownListComponent', () => {
  let component: EditableDropdownListComponent;
  let fixture: ComponentFixture<EditableDropdownListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditableDropdownListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditableDropdownListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
