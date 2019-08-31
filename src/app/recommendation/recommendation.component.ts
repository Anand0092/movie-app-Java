import { Component, OnInit, OnDestroy } from '@angular/core';
import { Movie, MovieResponse } from '../common/movie/movie';
import { MovieService } from '../common/movie.service';
import { PageChangedEvent } from 'ngx-bootstrap/pagination/pagination.component';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-recommendation',
  templateUrl: './recommendation.component.html',
  styleUrls: ['./recommendation.component.css']
})
export class RecommendationComponent implements OnInit, OnDestroy {
  public searchResult: MovieResponse;
  public movies: Movie[];
  public myrecommendation: MovieResponse;
  public myMovies: Movie[];
  public recommended: Movie[];
  private recommendation$ = new Subject<Movie>();
  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.getMovies(null);
    this.recommendation$.subscribe(movie =>
      this.movieService.toggleRecommendation(this.movies, movie)
    );
    this.recommendation$.subscribe(movie => {
      if (movie.recommended) {
        this.myMovies.push(movie);
      } else {
        const index = this.myMovies.findIndex(m => m.id === movie.id);
        this.myMovies.splice(index, 1);
      }
    });
    this.recommendation$.subscribe(movie =>
      this.movieService.toggleRecommendation(this.recommended, movie)
    );
  }

  ngOnDestroy() {
    this.recommendation$.unsubscribe();
  }

  handleKeyDown(event) {
    if (event.keyCode === 13) {
      this.search(event.target.value, null);
    }
  }

  search(keyword: string, event: PageChangedEvent) {
    if (!keyword.trim()) {
      return;
    }
    let page = '1';
    if (event) {
      page = event.page + '';
    }
    this.movieService.search(keyword, page).subscribe((data: MovieResponse) => {
      this.searchResult = data;
      this.movies = data.movies;
      window.scrollTo(0, 0);
    });
  }

  getMovies(event: PageChangedEvent) {
    let page = '1';
    if (event) {
      page = event.page + '';
    }
    this.movieService.getMovies(page).subscribe((data: MovieResponse) => {
      this.myrecommendation = data;
      this.myMovies = data.movies;
      window.scrollTo(0, 0);
    });
  }

  recommendMovie(myMovie: Movie) {
    let index = -1;
    if (this.movies) {
      index = this.movies.findIndex(movie => movie.id === myMovie.id);
      if (index > -1) {
        this.movies[index] = myMovie;
      }
    }
    if (this.recommended) {
      index = this.recommended.findIndex(movie => movie.id === myMovie.id);
      if (index > -1) {
        this.recommended[index] = myMovie;
      }
    }
    if (this.myMovies && myMovie.recommended) {
      this.myMovies.push(myMovie);
    }
  }

  unrecommendMovie(myMovie: Movie) {
    let index = -1;
    if (this.movies) {
      index = this.movies.findIndex(movie => movie.id === myMovie.id);
      if (index > -1) {
        this.movies[index] = myMovie;
      }
    }
    if (this.recommended) {
      index = this.recommended.findIndex(movie => movie.id === myMovie.id);
      if (index > -1) {
        this.recommended[index] = myMovie;
      }
    }
    if (this.myMovies && !myMovie.recommended) {
      index = this.myMovies.findIndex(movie => movie.id === myMovie.id);
      if (index > -1) {
        this.myMovies.splice(index, 1);
      }
    }
  }

  recommendedMovies(movies: Movie[]) {
    this.recommended = movies;
    window.scrollTo(0, 0);
  }

  toggleMovieRecommendation(myMovie: Movie) {
    this.recommendation$.next(myMovie);
  }
}
