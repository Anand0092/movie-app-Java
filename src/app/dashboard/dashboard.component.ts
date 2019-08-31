import { Component, OnInit, OnDestroy } from '@angular/core';
import { MovieService } from '../common/movie.service';
import { Movie, MovieResponse } from '../common/movie/movie';
import { PageChangedEvent } from 'ngx-bootstrap/pagination/pagination.component';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  public forthcomingResult: MovieResponse;
  public trendingResult: MovieResponse;
  public forthcoming: Movie[];
  public trending: Movie[];
  public recommended: Movie[];
  private recommendation$ = new Subject<Movie>();
  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.getPopular(null);
    this.getForthcoming(null);
    this.recommendation$.subscribe(movie =>
      this.movieService.toggleRecommendation(this.trending, movie)
    );
    this.recommendation$.subscribe(movie =>
      this.movieService.toggleRecommendation(this.forthcoming, movie)
    );
    this.recommendation$.subscribe(movie =>
      this.movieService.toggleRecommendation(this.recommended, movie)
    );
  }

  ngOnDestroy() {
    this.recommendation$.unsubscribe();
  }
  getForthcoming(event: PageChangedEvent) {
    let page = '1';
    if (event) {
      page = event.page + '';
    }
    this.movieService.upcoming(page).subscribe(data => {
      this.forthcomingResult = data;
      this.forthcoming = data.movies;
      this.scrollToTop();
    });
  }

  getPopular(event: PageChangedEvent) {
    let page = '1';
    if (event) {
      page = event.page + '';
    }
    this.movieService.popular(page).subscribe(data => {
      this.trendingResult = data;
      this.trending = data.movies;
      this.scrollToTop();
    });
  }

  recommendedMovies(movies: Movie[]) {
    this.recommended = movies;
    this.scrollToTop();
  }

  scrollToTop() {
    window.scrollTo(0, 0);
  }
  toggleMovieRecommendation(myMovie: Movie) {
    this.recommendation$.next(myMovie);
  }
}
