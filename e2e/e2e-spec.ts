import {
  browser,
  element,
  by,
  By,
  $,
  $$,
  ExpectedConditions
} from 'protractor';
import { all } from 'q';
import { ElementFinder } from 'protractor/built/element';

describe('Movie app', function() {
  it('should display title', () => {
    expect(browser.getTitle()).toEqual('Movie Application');
  });
  it('should be redirected to /dashboard on opening the application', () => {
    expect(browser.getCurrentUrl()).toContain('/dashboard');
  });
  it('should be able to view Trending movies', () => {
    const trendingElement = $('#trending.active');
    browser.wait(ExpectedConditions.visibilityOf(trendingElement));
    expect(trendingElement.getTagName()).toBe('tab');
  });
  it('should be able to view Forthcoming movies', () => {
    $('#forthcoming-link').click();
    const forthcomingElement = $('#forthcoming.active');
    expect(forthcomingElement.getTagName()).toBe('tab');
  });
  it('should be able to view Recommendations', () => {
    $$('#forthcoming .recommendations')
      .first()
      .click();
    const recommendationsElement = $('#recommendations.active');
    browser.wait(ExpectedConditions.visibilityOf(recommendationsElement));
    expect(recommendationsElement.getTagName()).toBe('tab');
  });
  it('should be redirected to /my-recommendations on selecting menu item', () => {
    $('[routerLink=my-recommendations]').click();
    expect(browser.getCurrentUrl()).toContain('/my-recommendations');
  });
  it('should be able to search for movies', () => {
    $('#search-text-field').sendKeys('harry potter and the chamber of secrets');
    $('#search-button').click();
  });
  it('should display search results in the search result section', () => {
    browser.wait(ExpectedConditions.visibilityOf($('#search-results.active')));
    const searchResultElement = $('#search-results.active');
    expect(searchResultElement.getTagName()).toBe('tab');
  });
  let movie: ElementFinder;
  it('should be able to select a movie with selector .movie-card', () => {
    movie = $$('.movie-card').first();
    expect(movie.getTagName()).toBe('div');
  });
  it('should display movie poster', () => {
    const posterElement = movie.$('.movie-poster');
    expect(posterElement.getTagName()).toMatch('img|div');
  });
  it('should display movie title', () => {
    const movieTitle = movie.$('.movie-title');
    expect(movieTitle.getText()).toEqual(
      'Harry Potter and the Chamber of Secrets'
    );
  });
  it('should display movie rating', () => {
    expect(movie.$('.movie-rating').getText()).toBeGreaterThanOrEqual(0);
  });
  it('should display movie description', () => {
    expect(movie.$('.movie-description').getText()).toContain('Hogwarts');
  });
  it('should add movie to My Recommendation list', () => {
    movie.$('.recommend').click();
    const actual = movie.$('.movie-title').getText();
    const unrecommend = movie.$('.unrecommend');
    browser.wait(ExpectedConditions.visibilityOf(unrecommend));
    $('#my-recommendations-link').click();
    const mymovie = $('#my-recommendations .movie-card');
    expect(mymovie.$('.movie-title').getText()).toEqual(actual);
  });
  it('should remove movie from My Recommendation list', () => {
    $('#search-results-link').click();
    movie.$('.unrecommend').click();
    const recommend = movie.$('.recommend');
    browser.wait(ExpectedConditions.visibilityOf(recommend));
  });
});
