import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { UIPresentationConfigService } from '../../services/ui-presentation-config.service';
import { User } from '../../interfaces/user';
import { AuthService } from '../../api/auth.service';
import { CommonService } from '../../services/common.service';
import { MovieService } from '../../api/movie.service';
import { TvShowService } from '../../api/tvshow.service';
import { MovieForListDto } from '../../api/dtos/movie-for-list.dto';
import { TvShowForListDto } from '../../api/dtos/tvshow-for-list.dto';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})

export class HeaderComponent implements OnInit {

  showHeader = true;
  user: User | undefined;
  movies: MovieForListDto[] = [];
  tvshows: TvShowForListDto[] = [];
  searchResults: (MovieForListDto | TvShowForListDto)[] = [];

  constructor(public router: Router, private authService: AuthService, private uiPresentationConfigService: UIPresentationConfigService,
  private commonService: CommonService, private movieService: MovieService, private tvShowService: TvShowService) {
  type ProductionForListDto = MovieForListDto | TvShowForListDto;
    this.authService.currentUser$.subscribe(user => {
      this.user = user;
    });
  }

  get selectedTheme() {
    return this.uiPresentationConfigService.getSelectedTheme();
  }

  get selectedAnimation() {
    return this.uiPresentationConfigService.getSelectedAnimation();
  }

  get selectedScrollSnap() {
    return this.uiPresentationConfigService.getScrollSnapState();
  }

  toggleAnimationCheckbox() {
    const animationState = !this.selectedAnimation;
    this.uiPresentationConfigService.toggleBoxAnimation(animationState);
  }

  toggleScrollSnapCheckbox() {
    const scrollSnapState = !this.selectedScrollSnap; 
    this.uiPresentationConfigService.applyScrollSnap(scrollSnapState);
  }

  changeTheme(theme: string) {
    this.uiPresentationConfigService.setTheme(theme);
  }  

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showHeader = !event.url.includes('confirm-email');
      }
    });
  }

  logOut(): void {
    this.authService.logout();
    this.user = undefined;
    this.router.navigate(['/']);
  }

  searchProductions(searchText: string) {
    if (searchText.length > 2)
    {
      this.searchResults = [];
      this.movieService.searchMovies(searchText).subscribe(
        (results: MovieForListDto[]) => {
          this.movies = results;
          this.searchResults.push(...results);
        },
        error => {
          console.error('There was an error while searching for movies:', error);
        }
      );

      this.tvShowService.searchTvShows(searchText).subscribe(
        (results: TvShowForListDto[]) => {
          this.tvshows = results;
          this.searchResults.push(...results);

        },
        error => {
          console.error('There was an error while searching for movies:', error);
        }
      );
    }
    else
    {
      this.searchResults = [];
      this.movies = [];
      this.tvshows = [];
    }
  }

  showProductionDetails(productionDetails: MovieForListDto | TvShowForListDto): void {
    let category: string;

    if (this.user !== undefined && productionDetails) {
      this.router.navigate(['/details', category, productionDetails.id]);
    } else {
      console.log('Please Sign In before checking production.');
    }
  }
}
