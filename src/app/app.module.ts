import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule, routedComponents } from './app-routing.module';
import { RecommendationComponent } from './recommendation/recommendation.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MovieComponent } from './common/movie/movie.component';
import { MovieService } from './common/movie.service';

import { PaginationModule, TabsModule } from 'ngx-bootstrap';

export const myComponents = [AppComponent, MovieComponent, ...routedComponents];

@NgModule({
  declarations: [...myComponents],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    PaginationModule.forRoot(),
    TabsModule.forRoot()
  ],
  providers: [MovieService],
  bootstrap: [AppComponent]
})
export class AppModule {}
