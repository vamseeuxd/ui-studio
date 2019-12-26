import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UiStudioHeaderContainerContainer } from './ui-studio-header-container-container.component';

describe('UiStudioHeaderContainerComponent', () => {
  let component: UiStudioHeaderContainerContainer;
  let fixture: ComponentFixture<UiStudioHeaderContainerContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UiStudioHeaderContainerContainer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UiStudioHeaderContainerContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
