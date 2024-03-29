package com.stackroute.movieapp.tmdb.search.dto;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.validation.Valid;
import com.fasterxml.jackson.annotation.JsonAnyGetter;
import com.fasterxml.jackson.annotation.JsonAnySetter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({ "page", "total_results", "total_pages", "results" })
public class SearchResponse {

	@JsonProperty("page")
	private Integer page;
	@JsonProperty("total_results")
	private Integer totalResults;
	@JsonProperty("total_pages")
	private Integer totalPages;
	@JsonProperty("results")
	@Valid
	private List<Result> results = null;
	@JsonIgnore
	@Valid
	private Map<String, Object> additionalProperties = new HashMap<>();

	@JsonProperty("page")
	public Integer getPage() {
		return page;
	}

	@JsonProperty("page")
	public void setPage(Integer page) {
		this.page = page;
	}

	@JsonProperty("total_results")
	public Integer getTotalResults() {
		return totalResults;
	}

	@JsonProperty("total_results")
	public void setTotalResults(Integer totalResults) {
		this.totalResults = totalResults;
	}

	@JsonProperty("total_pages")
	public Integer getTotalPages() {
		return totalPages;
	}

	@JsonProperty("total_pages")
	public void setTotalPages(Integer totalPages) {
		this.totalPages = totalPages;
	}

	@JsonProperty("results")
	public List<Result> getResults() {
		return results;
	}

	@JsonProperty("results")
	public void setResults(List<Result> results) {
		this.results = results;
	}

	@JsonAnyGetter
	public Map<String, Object> getAdditionalProperties() {
		return this.additionalProperties;
	}

	@JsonAnySetter
	public void setAdditionalProperty(String name, Object value) {
		this.additionalProperties.put(name, value);
	}

}