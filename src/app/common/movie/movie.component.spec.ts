import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieComponent } from './movie.component';
import { MovieService } from '../movie.service';
import { Movie, MovieResponse } from './movie';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

export class MockMovieService {
  movieResponse: MovieResponse = {
    page: 1,
    total_pages: 1,
    total_results: 1,
    status: '',
    movies: []
  };
  recommendedMovies: Movie[] = [
    {
      id: 2,
      description: 'Harry Potter Part 7',
      poster: 'favicon.ico',
      rating: 7.6,
      recommended: true,
      title: 'Harry Potter and Deathly Hallows'
    },
    {
      id: 3,
      description: 'Harry Potter Part 6',
      poster: 'favicon.ico',
      rating: 7.9,
      recommended: true,
      title: 'Harry Potter and Half-blood Prince'
    }
  ];
  recommend(movie: Movie) {
    movie.recommended = true;
    this.movieResponse.movies.push(movie);
    return Observable.of(this.movieResponse);
  }
  unrecommend(movie: Movie) {
    movie.recommended = false;
    this.movieResponse.movies.push(movie);
    return Observable.of(this.movieResponse);
  }
  recommendations(movie: Movie) {
    this.movieResponse.movies = this.recommendedMovies;
    return Observable.of(this.movieResponse);
  }
  upcoming(page: string) {
    this.movieResponse.movies = this.recommendedMovies;
    return Observable.of(this.movieResponse);
  }
  popular(page: string) {
    this.movieResponse.movies = this.recommendedMovies;
    return Observable.of(this.movieResponse);
  }
  search(query: string, page: string) {
    this.movieResponse.movies = this.recommendedMovies;
    return Observable.of(this.movieResponse);
  }
  getMovies(page: string) {
    this.movieResponse.movies = this.recommendedMovies;
    return Observable.of(this.movieResponse);
  }
}
describe('MovieComponent', () => {
  let component: MovieComponent;
  let fixture: ComponentFixture<MovieComponent>;
  let service: MockMovieService;
  const movie: Movie = {
    id: 1,
    description: 'Harry Potter Part 5',
    poster: 'favicon.ico',
    rating: 7.5,
    recommended: true,
    title: 'Harry Potter and Order of Pheonix'
  };
  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [MovieComponent],
        providers: [{ provide: MovieService, useClass: MockMovieService }]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieComponent);
    component = fixture.componentInstance;
    component.movie = movie;
    service = TestBed.get(MovieService);
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
  it('should recommend a movie', () => {
    component.recommend();
    expect(component.movie.recommended).toBe(true);
  });
  it('should unrecommend a movie', () => {
    component.unrecommend();
    expect(component.movie.recommended).toBe(false);
  });
  it('should emit recommendEvent', done => {
    component.toggleRecommendationEvent.subscribe(mymovie => {
      expect(mymovie).toEqual(movie);
      done();
    });
    component.recommend();
  });
  it('should emit unrecommendEvent', done => {
    component.toggleRecommendationEvent.subscribe(mymovie => {
      expect(mymovie).toEqual(movie);
      done();
    });
    component.unrecommend();
  });
  it('should recommend movies from 3rd party', done => {
    component.viewRecommendationEvent.subscribe(mymovies => {
      expect(mymovies).toEqual(service.recommendedMovies);
      done();
    });
    component.viewRecommendations();
  });
});
