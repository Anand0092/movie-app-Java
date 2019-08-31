package com.stackroute.movieapp.recommendations.boundary;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.stackroute.movieapp.recommendations.control.MovieService;
import com.stackroute.movieapp.recommendations.entity.Movie;
import com.stackroute.movieapp.recommendations.entity.MovieResponse;

@RestController
@RequestMapping("/movie")
public class MovieResource {

	@Autowired
	MovieService movieService;

	@GetMapping("/search")
	public MovieResponse search(@RequestParam("query") String query,
			@RequestParam(name = "page", defaultValue = "1") String page) {
		return movieService.search(query, page);
	}

	@PostMapping("/my-recommendations")
	public MovieResponse recommend(@RequestBody Movie movie) {
		return movieService.save(movie);
	}

	@DeleteMapping("/my-recommendations/{id}")
	public MovieResponse unrecommend(@PathVariable Long id) {
		return movieService.delete(id);
	}

	@GetMapping("/my-recommendations")
	public MovieResponse myRecommendations(
			@RequestParam(name = "page", defaultValue = "1") int page) {
		return movieService.getMyRecommendations(page);
	}

	@GetMapping("/trending")
	public MovieResponse trending(@RequestParam(name = "page", defaultValue = "1") String page) {
		return movieService.trending(page);
	}

	@GetMapping("/forthcoming")
	public MovieResponse forthcoming(@RequestParam(name = "page", defaultValue = "1") String page) {
		return movieService.forthcoming(page);
	}

	@GetMapping("/recommended")
	public MovieResponse recommended(@RequestParam("id") Long id,
			@RequestParam(name = "page", defaultValue = "1") String page) {
		return movieService.recommended(id, page);
	}
}
