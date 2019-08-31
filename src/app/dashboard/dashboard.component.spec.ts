import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { MovieComponent } from '../common/movie/movie.component';
import { MovieService } from '../common/movie.service';
import { MockMovieService } from '../common/movie/movie.component.spec';

import { TabsModule, TabsetConfig } from 'ngx-bootstrap/tabs';
import { PaginationModule, PaginationConfig } from 'ngx-bootstrap/pagination';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let service: MockMovieService;
  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [DashboardComponent, MovieComponent],
        providers: [
          { provide: MovieService, useClass: MockMovieService },
          TabsetConfig,
          PaginationConfig
        ],
        imports: [TabsModule, PaginationModule]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    service = TestBed.get(MovieService);
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
  it('should get popular movies', () => {
    component.getPopular(null);
    expect(component.trending.length).toEqual(2);
  });
  it('should get forthcoming movies', () => {
    component.getForthcoming(null);
    expect(component.forthcoming.length).toEqual(2);
  });
  it('should get recommended movies', () => {
    component.recommendedMovies(service.recommendedMovies);
    expect(component.recommended.length).toEqual(2);
  });
});
