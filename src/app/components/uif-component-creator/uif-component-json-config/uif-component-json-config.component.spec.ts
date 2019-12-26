import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UifComponentJsonConfigComponent } from './uif-component-json-config.component';

describe('UifComponentJsonConfigComponent', () => {
  let component: UifComponentJsonConfigComponent;
  let fixture: ComponentFixture<UifComponentJsonConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UifComponentJsonConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UifComponentJsonConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
