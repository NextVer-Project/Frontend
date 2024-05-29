import { TestBed } from '@angular/core/testing';

import { UIPresentationConfigService } from './ui-presentation-config.service';

describe('ThemeService', () => {
  let service: UIPresentationConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UIPresentationConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
