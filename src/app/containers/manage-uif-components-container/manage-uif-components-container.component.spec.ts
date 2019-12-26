import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageUifComponentsContainer } from './manage-uif-components-container.component';

describe('ManageUifComponentsContainerComponent', () => {
  let component: ManageUifComponentsContainer;
  let fixture: ComponentFixture<ManageUifComponentsContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageUifComponentsContainer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageUifComponentsContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
