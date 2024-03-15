import { TestBed } from '@angular/core/testing';

import { UIPresentationConfigService } from './theme.service';

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
