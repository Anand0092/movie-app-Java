package com.stackroute.movieapp.recommendations.boundary;

import static org.junit.Assert.assertEquals;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import javax.ws.rs.core.MediaType;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.stackroute.movieapp.recommendations.control.MovieService;
import com.stackroute.movieapp.recommendations.entity.Movie;
import com.stackroute.movieapp.recommendations.entity.MovieResponse;

@RunWith(SpringRunner.class)
@WebMvcTest(controllers = MovieResource.class, secure = false)
public class MovieResourceTest {

	private ObjectMapper mapper = new ObjectMapper();

	@Autowired
	MockMvc mockMvc;

	@MockBean
	MovieService movieService;

	MovieResponse mockResponse;

	@Before
	public void setup() {
		mockResponse = new MovieResponse();
		mockResponse.getMovies()
				.add(new Movie(671L,
						"Harry Potter has lived under the stairs at his aunt and uncle's house his whole life ...",
						"Harry Potter and the Philosopher's Stone",
						"http://image.tmdb.org/t/p/w185/sdEOH0992YZ0QSxgXNIGLq1ToUi.jpg", 7.6, false));
		mockResponse.getMovies()
				.add(new Movie(672L, "Ignoring threats to his life, Harry returns to Hogwarts to investigate ...",
						"Harry Potter and the Chamber of Secrets",
						"http://image.tmdb.org/t/p/w185/dCtFvscYcXQKTNvyyaQr2g2UacJ.jpg", 7.4, false));
		mockResponse.getMovies()
				.add(new Movie(673L, "Harry, Ron and Hermione return to Hogwarts for another magic-filled year ...",
						"Harry Potter and the Prisoner of Azkaban",
						"http://image.tmdb.org/t/p/w185/jUFjMoLh8T2CWzHUSjKCojI5SHu.jpg", 7.7, false));
		mockResponse.setPage(1);
		mockResponse.setTotalPages(1);
		mockResponse.setTotalResults(3);
	}

	@Test
	public void search() throws Exception {
		Mockito.when(movieService.search(Mockito.anyString(), Mockito.anyString())).thenReturn(mockResponse);
		RequestBuilder requestBuilder = MockMvcRequestBuilders.get("/movie/search").param("query", "potter")
				.param("page", "1").accept(MediaType.APPLICATION_JSON);
		MvcResult result = mockMvc.perform(requestBuilder).andReturn();

		String expected = mapper.writeValueAsString(mockResponse);
		assertEquals(expected, result.getResponse().getContentAsString());
	}

	@Test
	public void myRecommendations() throws Exception {
		Mockito.when(movieService.getMyRecommendations(Mockito.anyInt())).thenReturn(mockResponse);
		RequestBuilder requestBuilder = MockMvcRequestBuilders.get("/movie/my-recommendations").param("page", "1")
				.accept(MediaType.APPLICATION_JSON);
		MvcResult result = mockMvc.perform(requestBuilder).andReturn();

		String expected = mapper.writeValueAsString(mockResponse);
		assertEquals(expected, result.getResponse().getContentAsString());
	}

	@Test
	public void recommend() throws Exception {
		Movie movie = mockResponse.getMovies().get(0);
		mockResponse = new MovieResponse();
		mockResponse.getMovies()
				.add(new Movie(671L,
						"Harry Potter has lived under the stairs at his aunt and uncle's house his whole life ...",
						"Harry Potter and the Philosopher's Stone",
						"http://image.tmdb.org/t/p/w185/sdEOH0992YZ0QSxgXNIGLq1ToUi.jpg", 7.6, true));
		Mockito.when(movieService.save(Mockito.anyObject())).thenReturn(mockResponse);
		RequestBuilder requestBuilder = MockMvcRequestBuilders.post("/movie/my-recommendations")
				.contentType(MediaType.APPLICATION_JSON).content(mapper.writeValueAsString(movie))
				.accept(MediaType.APPLICATION_JSON);
		mockMvc.perform(requestBuilder).andExpect(status().isOk())
				.andExpect(MockMvcResultMatchers.content().string(mapper.writeValueAsString(mockResponse)));
	}

	@Test
	public void unrecommend() throws Exception {
		Movie movie = mockResponse.getMovies().get(0);
		mockResponse = new MovieResponse();
		Mockito.when(movieService.delete(Mockito.anyLong())).thenReturn(mockResponse);
		RequestBuilder requestBuilder = MockMvcRequestBuilders.delete("/movie/my-recommendations/" + movie.getId())
				.accept(MediaType.APPLICATION_JSON);
		MvcResult result = mockMvc.perform(requestBuilder).andReturn();

		String expected = mapper.writeValueAsString(mockResponse);
		assertEquals(expected, result.getResponse().getContentAsString());
	}

	@Test
	public void trending() throws Exception {
		Mockito.when(movieService.trending(Mockito.anyString())).thenReturn(mockResponse);
		RequestBuilder requestBuilder = MockMvcRequestBuilders.get("/movie/trending").param("page", "1")
				.accept(MediaType.APPLICATION_JSON);
		MvcResult result = mockMvc.perform(requestBuilder).andReturn();
		ObjectMapper mapper = new ObjectMapper();
		String expected = mapper.writeValueAsString(mockResponse);
		assertEquals(expected, result.getResponse().getContentAsString());
	}

	@Test
	public void forthcoming() throws Exception {
		Mockito.when(movieService.forthcoming(Mockito.anyString())).thenReturn(mockResponse);
		RequestBuilder requestBuilder = MockMvcRequestBuilders.get("/movie/forthcoming").param("page", "1")
				.accept(MediaType.APPLICATION_JSON);
		MvcResult result = mockMvc.perform(requestBuilder).andReturn();
		ObjectMapper mapper = new ObjectMapper();
		String expected = mapper.writeValueAsString(mockResponse);
		assertEquals(expected, result.getResponse().getContentAsString());
	}

	@Test
	public void recommended() throws Exception {
		Mockito.when(movieService.recommended(Mockito.anyLong(), Mockito.anyString())).thenReturn(mockResponse);
		RequestBuilder requestBuilder = MockMvcRequestBuilders.get("/movie/recommended").param("id", "671")
				.param("page", "1").accept(MediaType.APPLICATION_JSON);
		MvcResult result = mockMvc.perform(requestBuilder).andReturn();
		ObjectMapper mapper = new ObjectMapper();
		String expected = mapper.writeValueAsString(mockResponse);
		assertEquals(expected, result.getResponse().getContentAsString());
	}
}
