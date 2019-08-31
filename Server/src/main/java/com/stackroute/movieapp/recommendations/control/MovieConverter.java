package com.stackroute.movieapp.recommendations.control;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import com.stackroute.movieapp.recommendations.entity.Movie;
import com.stackroute.movieapp.tmdb.search.dto.Result;

@Component
public class MovieConverter implements Converter<Result, Movie> {

	@Autowired
	private ImageService imageService;

	@Autowired
	private MovieRepository movieRepository;
	
	@Override
	public Movie convert(Result result) {
		Movie movie = new Movie();
		Long identifier = result.getId();
		movie.setId(identifier);
		movie.setTitle(result.getTitle());
		movie.setDescription(result.getOverview());
		movie.setRating(result.getVoteAverage());
		movie.setRecommended(isRecommended(identifier));
		String strPath = result.getPosterPath();
		if (strPath != null) {
			strPath = imageService.getImageUrl(strPath);
		}
		movie.setPoster(strPath);
		return movie;
	}

	private boolean isRecommended(Long id) {
		return movieRepository.exists(id);
	}


}
