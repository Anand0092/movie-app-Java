import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Movie, MovieResponse } from './movie';
import { MovieService } from '../movie.service';
import { error } from 'selenium-webdriver';
import { HttpErrorResponse } from '@angular/common/http/src/response';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  @Input('movie') public movie: Movie;
  @Output() toggleRecommendationEvent: EventEmitter<Movie> = new EventEmitter<Movie>();
  @Output()
  viewRecommendationEvent: EventEmitter<Movie[]> = new EventEmitter<Movie[]>();
  constructor(public movieService: MovieService) {}

  ngOnInit() {}
  public recommend() {
    this.movieService.recommend(this.movie).subscribe(
      (data: MovieResponse) => {
        this.movie = data.movies[0];
        this.toggleRecommendationEvent.emit(data.movies[0]);
      },
      (error: HttpErrorResponse) => {
        this.toggleRecommendationEvent.emit(this.movie);
      }
    );
  }
  public unrecommend() {
    this.movieService.unrecommend(this.movie).subscribe(
      (data: MovieResponse) => {
        this.movie.recommended = false;
        this.toggleRecommendationEvent.emit(this.movie);
      },
      (error: HttpErrorResponse) => {
        this.toggleRecommendationEvent.emit(this.movie);
      }
    );
  }
  public viewRecommendations() {
    this.movieService
      .recommendations(this.movie)
      .subscribe((data: MovieResponse) => {
        const recommended = data.movies;
        this.viewRecommendationEvent.emit(recommended);
      });
  }
}
