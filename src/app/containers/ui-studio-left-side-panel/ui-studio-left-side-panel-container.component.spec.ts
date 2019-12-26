import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UiStudioLeftSidePanelContainer } from './ui-studio-left-side-panel-container.component';

describe('UiStudioLeftSidePanelComponent', () => {
  let component: UiStudioLeftSidePanelContainer;
  let fixture: ComponentFixture<UiStudioLeftSidePanelContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UiStudioLeftSidePanelContainer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UiStudioLeftSidePanelContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
