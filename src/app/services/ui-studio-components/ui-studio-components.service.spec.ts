import { TestBed } from '@angular/core/testing';

import { UiStudioComponentsService } from './ui-studio-components.service';

describe('UiStudioComponentsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UiStudioComponentsService = TestBed.get(UiStudioComponentsService);
    expect(service).toBeTruthy();
  });
});
