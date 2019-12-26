import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UiStudioMiddleContentContainer } from './ui-studio-middle-content-container.component';

describe('UiStudioMiddleContentComponent', () => {
  let component: UiStudioMiddleContentContainer;
  let fixture: ComponentFixture<UiStudioMiddleContentContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UiStudioMiddleContentContainer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UiStudioMiddleContentContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
