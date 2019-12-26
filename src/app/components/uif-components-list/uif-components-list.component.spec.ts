import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UifComponentsListComponent } from './uif-components-list.component';

describe('UifComponentsListContainer', () => {
  let component: UifComponentsListComponent;
  let fixture: ComponentFixture<UifComponentsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UifComponentsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UifComponentsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
