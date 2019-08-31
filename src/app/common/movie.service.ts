import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MovieResponse, Movie } from './movie/movie';

@Injectable()
export class MovieService {
  constructor(private httpClient: HttpClient) {}

  search(query: string, page: string) {
    const params = new HttpParams()
      .set('query', query.trim())
      .set('page', page);
    return this.httpClient.get('/movie/search', { params });
  }

  upcoming(page: string) {
    const params = new HttpParams().set('page', page);
    return this.httpClient.get<MovieResponse>('/movie/forthcoming', { params });
  }

  popular(page: string) {
    const params = new HttpParams().set('page', page);
    return this.httpClient.get<MovieResponse>('/movie/trending', { params });
  }

  recommend(movie: Movie) {
    return this.httpClient.post('/movie/my-recommendations', movie);
  }

  unrecommend(movie: Movie) {
    return this.httpClient.delete(`/movie/my-recommendations/${movie.id}`);
  }

  getMovies(page: string) {
    const params = new HttpParams().set('page', page);
    return this.httpClient.get<MovieResponse>('/movie/my-recommendations', {
      params
    });
  }

  recommendations(movie: Movie) {
    const params = new HttpParams().set('id', movie.id + '');
    return this.httpClient.get<MovieResponse>('/movie/recommended', { params });
  }

  toggleRecommendation(movies: Movie[], movie: Movie) {
    if (movies) {
      const index = movies.findIndex(m => m.id === movie.id);
      if (index > -1) {
        movies[index] = movie;
      }
    }
  }
}
