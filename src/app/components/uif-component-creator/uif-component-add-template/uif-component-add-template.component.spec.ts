import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UifComponentAddTemplateComponent } from './uif-component-add-template.component';

describe('UifComponentAddTemplateComponent', () => {
  let component: UifComponentAddTemplateComponent;
  let fixture: ComponentFixture<UifComponentAddTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UifComponentAddTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UifComponentAddTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
