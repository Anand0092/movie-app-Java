package com.stackroute.movieapp.recommendations.control;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import com.stackroute.movieapp.recommendations.entity.Movie;
import com.stackroute.movieapp.recommendations.entity.MovieResponse;
import com.stackroute.movieapp.tmdb.search.dto.Result;
import com.stackroute.movieapp.tmdb.search.dto.SearchResponse;

@Component
public class MovieResponseConverter implements Converter<SearchResponse, MovieResponse> {
	
	@Autowired
	private Converter<Result, Movie> movieConverter;
	
	@Override
	public MovieResponse convert(SearchResponse response) {
		MovieResponse movieResponse = new MovieResponse();
		List<Movie> movies = new ArrayList<>();
		for (Result result : response.getResults()) {
			Movie movie = movieConverter.convert(result);
			movies.add(movie);
		}
		movieResponse.setMovies(movies);
		movieResponse.setPage(response.getPage());
		movieResponse.setTotalPages(response.getTotalPages());
		movieResponse.setTotalResults(response.getTotalResults());
		return movieResponse;
	}

}
