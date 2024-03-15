import { NgModule,  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PlatformModule } from '@angular/cdk/platform';

import { AppComponent, SafePipe } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { UIPresentationConfigService } from './services/ui-presentation-config.service';
import { MovieComponent } from './components/movie/movie.component';
import { TvshowComponent } from './components/tvshow/tvshow.component';
import { ProductionBrowserComponent } from './components/productionbrowser/production-browser.component';
import { ProductionRowComponent } from './components/productionbrowser/production-row/production-row.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { MovieDetailsComponent } from './components/movie/movie-details/movie-details.component';
import { TvshowDetailsComponent } from './components/tvshow/tvshow-details/tvshow-details.component';
import { MovieQualityVersionsDetailsComponent } from './components/movie/movie-details/movie-quality-versions-details/movie-quality-versions-details.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'movie', component: MovieComponent },
  { path: 'browser', component: ProductionBrowserComponent },
  { path: 'details/:category/:id', component: MovieDetailsComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    MovieComponent,
    TvshowComponent,
    ProductionBrowserComponent,
    ProductionRowComponent,
    RegisterComponent,
    MovieDetailsComponent,
    TvshowDetailsComponent,
    SafePipe,
    MovieQualityVersionsDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes, {
      onSameUrlNavigation: 'reload'
    }),
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    PlatformModule
  ],
  providers: [
    UIPresentationConfigService,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
