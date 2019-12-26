import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UiStudioHeaderComponent } from './ui-studio-header.component';

describe('UiStudioHeaderComponent', () => {
  let component: UiStudioHeaderComponent;
  let fixture: ComponentFixture<UiStudioHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UiStudioHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UiStudioHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
