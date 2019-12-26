import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UifComponentPreviewComponent } from './uif-component-preview.component';

describe('UifComponentPreviewComponent', () => {
  let component: UifComponentPreviewComponent;
  let fixture: ComponentFixture<UifComponentPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UifComponentPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UifComponentPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
