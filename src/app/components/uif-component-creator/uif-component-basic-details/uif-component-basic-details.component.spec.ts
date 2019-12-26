import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UifComponentBasicDetailsComponent } from './uif-component-basic-details.component';

describe('UifComponentBasicDetailsComponent', () => {
  let component: UifComponentBasicDetailsComponent;
  let fixture: ComponentFixture<UifComponentBasicDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UifComponentBasicDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UifComponentBasicDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
