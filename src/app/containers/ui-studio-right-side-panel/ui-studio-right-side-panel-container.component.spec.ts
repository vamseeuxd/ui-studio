import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UiStudioRightSidePanelContainer } from './ui-studio-right-side-panel-container.component';

describe('UiStudioRightSidePanelComponent', () => {
  let component: UiStudioRightSidePanelContainer;
  let fixture: ComponentFixture<UiStudioRightSidePanelContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UiStudioRightSidePanelContainer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UiStudioRightSidePanelContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
