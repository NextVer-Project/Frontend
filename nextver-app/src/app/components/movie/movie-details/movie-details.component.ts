import { Component, OnInit, AfterViewInit, OnDestroy} from '@angular/core';
import { ProductionDto } from '../../../api/dtos/production.dto';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from '../../../services/common.service';
import { AuthService } from '../../../api/auth.service';
import { MovieService } from '../../../api/movie.service';
import { ReleasePlaceService } from '../../../api/release-place.service';
import { ProductionTypeService } from '../../../api/production-type.service';
import { MovieDetailsDto } from '../../../api/dtos/movie-details.dto';
import { GenreForEditDto } from '../../../api/dtos/genre-for-edit.dto';
import { UniverseForEditDto } from '../../../api/dtos/universe-for-edit.dto';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Modal } from 'bootstrap';
import { ReleasePlaceForEditDto } from '../../../api/dtos/release-place-for-edit.dto';
import { MovieQualityVersionDetailsDto } from '../../../api/dtos/movie-quality-version-details.dto';
import { ProductionTypeForEditDto } from '../../../api/dtos/production-type-for-edit.dto';
import { DatePipe } from '@angular/common';
import { MovieDto } from '../../../api/dtos/movie.dto';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit, AfterViewInit, OnDestroy {
  public selectedProduction: ProductionDto | undefined;
  public movieDetails: MovieDetailsDto | undefined;
  public movieVersionDetails: MovieQualityVersionDetailsDto | undefined;
  public shouldDisplayIcons = true;
  public isFetching = false;
  display = "none";
  productionVersionModal: Modal | undefined;
  selectedMovieVersion: MovieQualityVersionDetailsDto | undefined;
  
  constructor(private router: Router, private commonService: CommonService, private authService: AuthService, private movieService: MovieService, private releasePlace: ReleasePlaceService, private productionType: ProductionTypeService, private datePipe: DatePipe, private route: ActivatedRoute) {
    this.selectedProduction = commonService.selectedProduction;
  }

  ngOnInit(): void {
    const movieId =+ this.route.snapshot.paramMap.get('id');
    this.loadMovieDetails(movieId);

    console.log('Trailer URL:', this.movieDetails?.trailerUrl);

    this.playTrailer();
    this.resizeScreen();
  }

  ngAfterViewInit(): void {
    this.loadBackground();
  }

  ngOnDestroy(): void {

  }

  playTrailer(): void {
    if (this.movieDetails && this.movieDetails.trailerUrl) {
      window.open(this.movieDetails.trailerUrl, '_blank');
    }
  }

  openTrailer(): void {
    if (this.movieDetails && this.movieDetails.trailerUrl) {
      window.open(this.movieDetails.trailerUrl, '_blank');
    }
  }

  loadBackground(): void {
    const background = document.getElementById('cover-background');
    background.style.background = 'linear-gradient(180deg, #000000cc, #000000ee), url("' + this.movieDetails.coverUrl + '")';
    background.style.backgroundPosition = 'center';
    background.style.backgroundSize = 'cover';
    background.style.backgroundRepeat = 'no-repeat';
    background.style.backgroundColor = 'black';
  }

  private loadMovieDetails(productionId: number): void {
    this.movieDetails = {
      id: 1,
      title: "",
      releaseDate: "",
      runtime: "",
      description: "",
      coverUrl: "",
      trailerUrl: "",
      viewCounter: 0,
      movieUniverses: [],
      movieGenres: [],
      releasePlaces: [],
      movieVersions: [],
    }

    this.movieService.getMovieGenres(productionId).subscribe(
      (response: Array<GenreForEditDto>) => {
        this.movieDetails.movieGenres = response;
      },
      error => {
        console.error('There was an error while loading movie genres details:', error);
      }
    );

    this.movieService.getMovieUniverses(productionId).subscribe(
      (response: Array<UniverseForEditDto>) => {
        this.movieDetails.movieUniverses = response;
      },
      error => {
        console.error('There was an error while loading movie universes details:', error);
      }
    );

    this.movieService.getMovieTrailerUrl(productionId).subscribe(
      (response: string) => {
        this.movieDetails.trailerUrl = response;
      },
      error => {
        console.error('There was an error while loading movie trailer details:', error);
      }
    );

    this.movieService.getMovieReleasePlace(productionId).subscribe(
      (response: Array<ReleasePlaceForEditDto>) => {
        this.movieDetails.releasePlaces = response;
      },
      error => {
        console.error('There was an error while loading movie release places details:', error);
      }
    );

    this.movieService.getMovieVersionQualityDetails(productionId).subscribe(
      (response: Array<MovieQualityVersionDetailsDto>) => {
        this.movieDetails.movieVersions = response;

        this.movieDetails.movieVersions.forEach(value =>
          this.releasePlace.getReleasePlaceDetails(value.releasePlaceId).subscribe(
            (releasePlaceResponse: ReleasePlaceForEditDto) => {
              value.releasePlace = releasePlaceResponse;
            },
            error => {
              console.error('There was an error while loading releasePlace details:', error);
            }
          )
        );

        this.movieDetails.movieVersions.forEach(value =>
          this.productionType.getProductionTypeDetails(value.productionTypeId).subscribe(
            (productionTypeResponse: ProductionTypeForEditDto) => {
              value.productionType = productionTypeResponse;
            },
            error => {
              console.error('There was an error while loading productionType details:', error);
            }
          )
        );

        this.selectedMovieVersion = this.movieDetails.movieVersions[0];
        this.selectedMovieVersion.releaseDate = this.datePipe.transform(this.selectedMovieVersion.releaseDate, 'dd MMM yyyy')
      },
      error => {
        console.error('There was an error while loading movie version details:', error);
      }
    );

    this.movieService.getMovieInfo(productionId).subscribe(
      (response: MovieDto) => {
        this.movieDetails.title = response.title;
        this.movieDetails.releaseDate = this.datePipe.transform(response.releaseDate, 'dd.MM.yyyy')
        this.movieDetails.description = response.description;
        this.movieDetails.coverUrl = response.coverUrl;
        this.movieDetails.viewCounter = response.viewCounter;

        const runtimeMinutes = parseInt(response.runtime, 10);
        const hours = Math.floor(runtimeMinutes / 60);
        const minutes = runtimeMinutes % 60;
        this.movieDetails.runtime = hours + "h " + minutes + " min";
      },
      error => {
        console.error('There was an error while loading movie release places details:', error);
      }
    );
  }

  selectMovieVersion(version: MovieQualityVersionDetailsDto): void {
    this.selectedMovieVersion = version;
    const date = this.datePipe.transform(version.releaseDate, 'dd MMM yyyy');
    this.selectedMovieVersion.releaseDate = date;
  }

  openModal() {
    this.display = "block";
  }
  onCloseHandled() {
    this.display = "none";
  }

  public resizeScreen(): void {
    const screenWidth = window.innerWidth;
    this.shouldDisplayIcons = screenWidth > 870;
  }
}
