package com.stackroute.movieapp.recommendations.control;

import org.springframework.data.repository.PagingAndSortingRepository;

import com.stackroute.movieapp.recommendations.entity.Movie;

public interface MovieRepository extends PagingAndSortingRepository<Movie, Long> {

}
