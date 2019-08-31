package com.stackroute.movieapp.recommendations.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Transient;

@Entity
public class Movie {
	@Id
	private Long id;
	@Column(length = 1500)
	private String description;
	private String title;
	private String poster;
	private double rating;
	@Transient
	private boolean isRecommended = true;

	public Movie() {
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getPoster() {
		return poster;
	}

	public void setPoster(String poster) {
		this.poster = poster;
	}

	public double getRating() {
		return rating;
	}

	public void setRating(double rating) {
		this.rating = rating;
	}

	public boolean isRecommended() {
		return isRecommended;
	}

	public void setRecommended(boolean isRecommended) {
		this.isRecommended = isRecommended;
	}

	public Movie(Long id, String description, String title, String poster, double rating, boolean isRecommended) {
		super();
		this.id = id;
		this.description = description;
		this.title = title;
		this.poster = poster;
		this.rating = rating;
		this.isRecommended = isRecommended;
	}

}
