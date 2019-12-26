import { TestBed } from '@angular/core/testing';

import { DeviceSimulatorService } from './device-simulator.service';

describe('DeviceSimulatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DeviceSimulatorService = TestBed.get(DeviceSimulatorService);
    expect(service).toBeTruthy();
  });
});
