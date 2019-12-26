import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UifComponentConfigEditorComponent } from './uif-component-config-editor.component';

describe('UifComponentConfigEditorComponent', () => {
  let component: UifComponentConfigEditorComponent;
  let fixture: ComponentFixture<UifComponentConfigEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UifComponentConfigEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UifComponentConfigEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
