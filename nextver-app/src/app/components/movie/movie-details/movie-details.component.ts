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

  
  constructor(private router: Router, private commonService: CommonService, private authService: AuthService, private movieService: MovieService, private releasePlace: ReleasePlaceService, private productionType: ProductionTypeService) {
    this.selectedProduction = commonService.selectedProduction;
  }

  ngOnInit(): void {
    if (this.selectedProduction === undefined) {
      this.router.navigate(['/']);
    }

    this.loadMovieDetails(this.selectedProduction.id);
    console.log('Trailer URL:', this.movieDetails?.trailerUrl);

    this.playTrailer();
    this.resizeScreen();
  }

  ngAfterViewInit(): void {
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

  private loadMovieDetails(productionId: number): void {
    this.movieDetails = {
      id: this.selectedProduction.id,
      title: this.selectedProduction.title,
      releaseDate: this.selectedProduction.releaseDate,
      runtime: this.selectedProduction.runtime,
      description: this.selectedProduction.description,
      coverUrl: this.selectedProduction.formattedProductionCoverUrl,
      trailerUrl: "",
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
      },
      error => {
        console.error('There was an error while loading movie version details:', error);
      }
    );
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
