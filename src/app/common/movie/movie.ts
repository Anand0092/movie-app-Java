export class Movie {
  id: number;
  title: string;
  poster: string;
  rating: number;
  description: string;
  recommended: boolean;
}

export class MovieResponse {
  status: string;
  movies: Movie[];
  page: number;
  total_results: number;
  total_pages: number;
}
