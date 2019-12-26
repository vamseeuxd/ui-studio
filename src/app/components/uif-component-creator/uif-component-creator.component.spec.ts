import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UifComponentCreatorComponent } from './uif-component-creator.component';

describe('UifComponentCreatorComponent', () => {
  let component: UifComponentCreatorComponent;
  let fixture: ComponentFixture<UifComponentCreatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UifComponentCreatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UifComponentCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
