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
import { ManagementComponent } from './components/management/management.component';
import { MovieAddComponent } from './components/management/movie-add/movie-add.component';
import { TvShowAddComponent } from './components/management/tvshow-add/tvshow-add.component';
import { ProductionCardComponent } from './components/home/production-card-component/production-card.component';
import { ProductionSearchComponent } from './components/productionbrowser/production-search/production-search.component';
import { MovieEditComponent } from './components/management/movie-edit/movie-edit.component';
import { TvShowEditComponent } from './components/management/tvshow-edit/tvshow-edit.component';
import { GenreEditComponent } from './components/management/genre-edit/genre-edit.component';
import { GenreAddComponent } from './components/management/genre-add/genre-add.component';
import { UniverseAddComponent } from './components/management/universe-add/universe-add.component';
import { UniverseEditComponent } from './components/management/universe-edit/universe-edit.component';
import { UserCollectionTypeEditComponent } from './components/management/user-collection-type-edit/user-collection-type-edit.component';
import { UserCollectionTypeAddComponent } from './components/management/user-collection-type-add/user-collection-type-add.component';
import { ProductionTypeAddComponent } from './components/management/production-type-add/production-type-add.component';
import { TechnologyTypeAddComponent } from './components/management/technology-type-add/technology-type-add.component';
import { UserTypeAddComponent } from './components/management/user-type-add/user-type-add.component';
import { ReleasePlaceTypeAddComponent } from './components/management/release-place-type-add/release-place-type-add.component';
import { NotificationTypeAddComponent } from './components/management/notification-type-add/notification-type-add.component';
import { EpisodeAddComponent } from './components/management/episode-add/episode-add.component';
import { ProductionTypeEditComponent } from './components/management/production-type-edit/production-type-edit.component';
import { TechnologyTypeEditComponent } from './components/management/technology-type-edit/technology-type-edit.component';
import { UserTypeEditComponent } from './components/management/user-type-edit/user-type-edit.component';
import { ReleasePlaceTypeEditComponent } from './components/management/release-place-type-edit/release-place-type-edit.component';
import { NotificationTypeEditComponent } from './components/management/notification-type-edit/notification-type-edit.component';
import { EpisodeEditComponent } from './components/management/episode-edit/episode-edit.component';
import { ReleasePlaceEditComponent } from './components/management/release-place-edit/release-place-edit.component';
import { ReleasePlaceAddComponent } from './components/management/release-place-add/release-place-add.component';
import { TechnologyEditComponent } from './components/management/technology-edit/technology-edit.component';
import { TechnologyAddComponent } from './components/management/technology-add/technology-add.component';
import { RatingCategoryAddComponent } from './components/management/rating-category-add/rating-category-add.component';
import { RatingCategoryEditComponent } from './components/management/rating-category-edit/rating-category-edit.component';
import { ToastrModule } from 'ngx-toastr';
import { EmailConfirmationComponent } from './components/email-confirmation/email-confirmation.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'confirm-email', component: EmailConfirmationComponent },
  { path: 'movie', component: MovieComponent },
  { path: 'browser', component: ProductionBrowserComponent },
  { path: 'details/:category/:id', component: MovieDetailsComponent },
  { path: 'management', component: ManagementComponent },
  { path: 'management/movie/add', component: MovieAddComponent },
  { path: 'management/movie/edit', component: MovieEditComponent },
  { path: 'management/tvshow/add', component: TvShowAddComponent },
  { path: 'management/tvshow/edit', component: TvShowEditComponent },
  { path: 'management/genre/add', component: GenreAddComponent },
  { path: 'management/genre/edit', component: GenreEditComponent },
  { path: 'management/universe/add', component: UniverseAddComponent },
  { path: 'management/universe/edit', component: UniverseEditComponent },
  { path: 'details/movie/:id', component: MovieDetailsComponent },
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
    MovieQualityVersionsDetailsComponent,
    ManagementComponent,
    MovieAddComponent,
    TvShowAddComponent,
    //ProductionSearchComponent
    ProductionCardComponent,
    ProductionSearchComponent,
    MovieEditComponent,
    TvShowEditComponent,
    GenreEditComponent,
    GenreAddComponent,
    UniverseAddComponent,
    UniverseEditComponent,
    UserCollectionTypeEditComponent,
    UserCollectionTypeAddComponent,
    ProductionTypeAddComponent,
    TechnologyTypeAddComponent,
    UserTypeAddComponent,
    ReleasePlaceTypeAddComponent,
    NotificationTypeAddComponent,
    EpisodeAddComponent,
    ProductionTypeEditComponent,
    TechnologyTypeEditComponent,
    UserTypeEditComponent,
    ReleasePlaceTypeEditComponent,
    NotificationTypeEditComponent,
    EpisodeEditComponent,
    ReleasePlaceEditComponent,
    ReleasePlaceAddComponent,
    TechnologyEditComponent,
    TechnologyAddComponent,
    RatingCategoryAddComponent,
    RatingCategoryEditComponent,
    EmailConfirmationComponent
  ],
  imports: [
    BrowserModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      progressBar: true,
      progressAnimation: 'increasing'
    }),
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
