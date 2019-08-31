import { TestBed, inject } from '@angular/core/testing';

import { MovieService } from './movie.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

describe('MovieService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MovieService],
      imports: [HttpClientModule]
    });
  });

  it(
    'should be created',
    inject([MovieService], (service: MovieService) => {
      expect(service).toBeTruthy();
    })
  );
});
