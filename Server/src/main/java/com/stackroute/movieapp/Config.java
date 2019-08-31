package com.stackroute.movieapp;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "movieapp.api")
public class Config {

	private String key;
	private String baseUrl;
	private String configPath;
	private String searchPath;
	private String trendingPath;
	private String forthcomingPath;
	private String recommendedPath;

	public String getKey() {
		return key;
	}

	public void setKey(String key) {
		this.key = key;
	}

	public String getBaseUrl() {
		return baseUrl;
	}

	public void setBaseUrl(String baseUrl) {
		this.baseUrl = baseUrl;
	}

	public String getConfigPath() {
		return configPath;
	}

	public void setConfigPath(String configPath) {
		this.configPath = configPath;
	}

	public String getSearchPath() {
		return searchPath;
	}

	public void setSearchPath(String searchPath) {
		this.searchPath = searchPath;
	}

	public String getTrendingPath() {
		return trendingPath;
	}

	public void setTrendingPath(String trendingPath) {
		this.trendingPath = trendingPath;
	}

	public String getForthcomingPath() {
		return forthcomingPath;
	}

	public void setForthcomingPath(String forthcomingPath) {
		this.forthcomingPath = forthcomingPath;
	}

	public String getRecommendedPath() {
		return recommendedPath;
	}

	public void setRecommendedPath(String recommendedPath) {
		this.recommendedPath = recommendedPath;
	}

}
