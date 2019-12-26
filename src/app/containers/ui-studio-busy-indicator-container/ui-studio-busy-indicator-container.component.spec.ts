import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UiStudioBusyIndicatorContainer } from './ui-studio-busy-indicator-container.component';

describe('UiStudioBusyIndicatorContainerComponent', () => {
  let component: UiStudioBusyIndicatorContainer;
  let fixture: ComponentFixture<UiStudioBusyIndicatorContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UiStudioBusyIndicatorContainer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UiStudioBusyIndicatorContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
