package com.stackroute.movieapp.recommendations.control;

import javax.annotation.PostConstruct;
import javax.inject.Singleton;
import javax.ws.rs.client.Client;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.core.MediaType;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.context.annotation.ApplicationScope;

import com.stackroute.movieapp.Config;
import com.stackroute.movieapp.tmdb.configuration.dto.ConfigurationResponse;
import com.stackroute.movieapp.tmdb.configuration.dto.Images;

@ApplicationScope
@Singleton
@Service
public class ImageService {

	private Images images;
	private Client client;
	@Autowired
	private Config properties;

	public ImageService() {
		client = ClientBuilder.newClient();
	}

	@PostConstruct
	public void initialize() {
		this.images = configuration().getImages();
	}

	private ConfigurationResponse configuration() {
		return client.target(properties.getBaseUrl()).path(properties.getConfigPath())
				.queryParam("api_key", properties.getKey()).request(MediaType.APPLICATION_JSON)
				.get(ConfigurationResponse.class);
	}

	public Images getImages() {
		return images;
	}

	public String getImageUrl(String path) {
		return images.getBaseUrl() + images.getPosterSizes().get(2) + path;
	}
}
