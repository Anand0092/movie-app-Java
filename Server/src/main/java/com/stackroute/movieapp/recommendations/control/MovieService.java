package com.stackroute.movieapp.recommendations.control;

import javax.ws.rs.client.Client;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.client.WebTarget;
import javax.ws.rs.core.MediaType;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.converter.Converter;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.stackroute.movieapp.Config;
import com.stackroute.movieapp.recommendations.entity.Movie;
import com.stackroute.movieapp.recommendations.entity.MovieResponse;
import com.stackroute.movieapp.tmdb.search.dto.SearchResponse;

@Service
public class MovieService {

	private static final String API_KEY = "api_key";

	@Autowired
	private Config properties;

	@Autowired
	private Converter<SearchResponse, MovieResponse> converter;

	@Autowired
	private MovieRepository movieRepository;

	private Client client;

	public MovieService() {
		client = ClientBuilder.newClient();
	}

	public MovieResponse search(String query, String page) {
		WebTarget target = client.target(properties.getBaseUrl()).path(properties.getSearchPath());
		SearchResponse response = target.queryParam(API_KEY, properties.getKey()).queryParam("query", query)
				.queryParam("page", page).request(MediaType.APPLICATION_JSON).get(SearchResponse.class);

		return converter.convert(response);
	}

	public MovieResponse forthcoming(String page) {
		WebTarget target = client.target(properties.getBaseUrl()).path(properties.getForthcomingPath());
		SearchResponse response = target.queryParam(API_KEY, properties.getKey()).queryParam("page", page)
				.request(MediaType.APPLICATION_JSON).get(SearchResponse.class);

		return converter.convert(response);
	}

	public MovieResponse trending(String page) {
		WebTarget target = client.target(properties.getBaseUrl()).path(properties.getTrendingPath());
		SearchResponse response = target.queryParam(API_KEY, properties.getKey()).queryParam("page", page)
				.request(MediaType.APPLICATION_JSON).get(SearchResponse.class);

		return converter.convert(response);
	}

	public MovieResponse recommended(Long id, String page) {
		WebTarget target = client.target(properties.getBaseUrl()).path(properties.getRecommendedPath())
				.resolveTemplate("id", id);
		SearchResponse response = target.queryParam(API_KEY, properties.getKey()).queryParam("page", page)
				.request(MediaType.APPLICATION_JSON).get(SearchResponse.class);

		return converter.convert(response);
	}

	public MovieResponse getMyRecommendations(int page) {
		Page<Movie> movies = movieRepository.findAll(new PageRequest(page - 1, 20));
		MovieResponse response = new MovieResponse();
		response.setMovies(movies.getContent());
		response.setPage(movies.getNumber());
		response.setTotalPages(movies.getTotalPages());
		response.setTotalResults(Integer.valueOf(movies.getTotalElements() + ""));
		return response;
	}

	public MovieResponse save(Movie movie) {
		Movie savedMovie = movieRepository.save(movie);
		MovieResponse response = new MovieResponse();
		response.getMovies().add(savedMovie);
		return response;
	}

	public MovieResponse delete(Long id) {
		movieRepository.delete(id);
		MovieResponse response = new MovieResponse();
		response.setStatus("success");
		return response;
	}
}
