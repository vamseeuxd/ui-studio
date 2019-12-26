import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UifComponentEditorComponent } from './uif-component-editor.component';

describe('UifComponentEditorComponent', () => {
  let component: UifComponentEditorComponent;
  let fixture: ComponentFixture<UifComponentEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UifComponentEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UifComponentEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
