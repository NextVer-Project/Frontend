import { Component, OnInit, AfterViewInit, OnDestroy, Input } from '@angular/core';
import { ProductionDto } from '../../../../api/dtos/production.dto';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from '../../../../services/common.service';
import { AuthService } from '../../../../api/auth.service';
import { MovieService } from '../../../../api/movie.service';
import { ReleasePlaceService } from '../../../../api/release-place.service';
import { MovieQualityVersionDetailsDto } from '../../../../api/dtos/movie-quality-version-details.dto';
import { GenreForEditDto } from '../../../../api/dtos/genre-for-edit.dto';
import { UniverseForEditDto } from '../../../../api/dtos/universe-for-edit.dto';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Modal } from 'bootstrap';
import { ReleasePlaceForEditDto } from '../../../../api/dtos/release-place-for-edit.dto';
import { MovieDetailsDto } from '../../../../api/dtos/movie-details.dto';

@Component({
  selector: 'app-movie-quality-versions-details',
  templateUrl: './movie-quality-versions-details.component.html',
  styleUrls: ['./movie-quality-versions-details.component.css']
})
export class MovieQualityVersionsDetailsComponent implements OnInit, AfterViewInit, OnDestroy {
  public selectedProduction: ProductionDto | undefined;
  public movieQualityVersionDetails: MovieQualityVersionDetailsDto | undefined;
  public shouldDisplayIcons = true;
  public isFetching = false;
  display = "none";
  productionVersionModal: Modal | undefined;

  @Input() moviesDetails: MovieDetailsDto | undefined;
  selectedMovieVersion: MovieQualityVersionDetailsDto | undefined;


  constructor(private router: Router, private commonService: CommonService, private authService: AuthService, private movieService: MovieService, private releasePlace: ReleasePlaceService) {
    this.selectedProduction = commonService.selectedProduction;
  }


  selectMovieVersion(version: MovieQualityVersionDetailsDto): void {
    this.selectedMovieVersion = version;
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {

  }

  ngOnDestroy(): void {

  }


  public resizeScreen(): void {
    const screenWidth = window.innerWidth;
    this.shouldDisplayIcons = screenWidth > 870;
  }
}
