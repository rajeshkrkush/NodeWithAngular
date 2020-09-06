import { TestBed } from '@angular/core/testing';

import { SendreceiveService } from './sendreceive.service';

describe('SendreceiveService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SendreceiveService = TestBed.get(SendreceiveService);
    expect(service).toBeTruthy();
  });
});
