package com.stackroute.movieapp.recommendations.entity;

import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;

import com.fasterxml.jackson.annotation.JsonProperty;

public class MovieResponse {

	@JsonProperty("status")
	private String status;

	@JsonProperty("movies")
	@Valid
	private List<Movie> movies = new ArrayList<>();

	@JsonProperty("page")
	private Integer page;

	@JsonProperty("total_results")
	private Integer totalResults;

	@JsonProperty("total_pages")
	private Integer totalPages;

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public List<Movie> getMovies() {
		return movies;
	}

	public void setMovies(List<Movie> movies) {
		this.movies = movies;
	}

	public Integer getPage() {
		return page;
	}

	public void setPage(Integer page) {
		this.page = page;
	}

	public Integer getTotalResults() {
		return totalResults;
	}

	public void setTotalResults(Integer totalResults) {
		this.totalResults = totalResults;
	}

	public Integer getTotalPages() {
		return totalPages;
	}

	public void setTotalPages(Integer totalPages) {
		this.totalPages = totalPages;
	}

}
