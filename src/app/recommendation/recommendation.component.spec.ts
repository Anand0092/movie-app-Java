import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendationComponent } from './recommendation.component';
import { MovieComponent } from '../common/movie/movie.component';
import { MovieService } from '../common/movie.service';
import { MockMovieService } from '../common/movie/movie.component.spec';

import { TabsModule, TabsetConfig } from 'ngx-bootstrap/tabs';
import { PaginationModule, PaginationConfig } from 'ngx-bootstrap/pagination';

describe('RecommendationComponent', () => {
  let component: RecommendationComponent;
  let fixture: ComponentFixture<RecommendationComponent>;
  let service: MockMovieService;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [RecommendationComponent, MovieComponent],
        providers: [
          { provide: MovieService, useClass: MockMovieService },
          TabsetConfig,
          PaginationConfig
        ],
        imports: [TabsModule, PaginationModule]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(RecommendationComponent);
    component = fixture.componentInstance;
    service = TestBed.get(MovieService);
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
  it('should search for movies', () => {
    component.search('potter', null);
    expect(component.movies.length).toEqual(2);
  });
  it('should get my recommended movies', () => {
    component.getMovies(null);
    expect(component.myMovies.length).toEqual(2);
  });
  it('should show recommended movies', () => {
    component.recommendedMovies(service.recommendedMovies);
    expect(component.recommended.length).toEqual(2);
  });
});
