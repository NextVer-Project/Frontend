import { Component, OnInit } from '@angular/core';
import { HostListener } from '@angular/core';
import { AuthService } from '../../api/auth.service';
import { MovieCountDto } from '../../api/dtos/movie-count.dto';
import { MovieDto } from '../../api/dtos/movie.dto';
import { PaginatedResult, Pagination } from '../../api/dtos/pagination';
import { ProductionCountDto } from '../../api/dtos/production-count.dto';
import { ProductionDto } from '../../api/dtos/production.dto';
import { TechnologyForEditDto } from '../../api/dtos/technology-for-edit.dto';
import { MovieService } from '../../api/movie.service';
import { ProductionService } from '../../api/production.service';
import { TechnologyService } from '../../api/technology.service';
import { CommonService } from '../../services/common.service';
import { ScrollService } from '../../services/scroll.service';
import { UIPresentationConfigService } from '../../services/ui-presentation-config.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  public movieCount: any;
  public productionCount: any;
  public productions: Array<ProductionDto> | undefined;
  public movies: Array<MovieDto> | undefined;
  public pagination: Pagination | undefined;
  public isFetching = false;
  public isFirstPage = false;
  public isLastPage = false;
  public fetchFailed = false;
  public shouldDisplayIcons: boolean;
  public isTvShow: boolean;
  public selectedCategory: string;
  public technologies: Array<TechnologyForEditDto>;


  constructor(
    private uiPresentationConfigService: UIPresentationConfigService,
    private movieService: MovieService,
    private productionService: ProductionService,
    private commonService: CommonService,
    private authService: AuthService,
    private technologyService: TechnologyService
  ) { }

  get selectedTheme() {
    return this.uiPresentationConfigService.getSelectedTheme();
  }

  get selectedAnimation() {
    return this.uiPresentationConfigService.getSelectedAnimation();
  }
  ngOnInit(): void {
    this.selectedCategory = this.commonService.getSelectedCategory(); 
    this.getNumberOfMovies();
    this.getMovies();
    this.getNumberOfProductions();
    this.getProductions(this.commonService.lastPage);
    this.getAllTechnologies();
  }

  private getNumberOfMovies(): void {
    this.movieService.GetNumberOfMovies().subscribe((response: MovieCountDto) => {
        this.movieCount = response.numberOfMovies;
     });
  }

  public getMovies(pageNumber: number = 1, itemsPerPage: number = 2): void {
    this.isFetching = true;
    this.movieService.getCurrentMovies(pageNumber, itemsPerPage).subscribe((response: PaginatedResult<Array<MovieDto>>) => {
      this.isFetching = false;
      this.fetchFailed = false;
      this.movies = response.result;
    }, error => {
      this.isFetching = false;
      this.fetchFailed = true;

      console.log('There was an error while processing Your request.');
    });
  }

  private getNumberOfProductions(): void {
    this.productionService.getNumberOfProductions(this.selectedCategory)
      .subscribe((response: ProductionCountDto) => {
        this.productionCount = response.numberOfProductions;
      });
  }

  public getProductions(pageNumber: number = 1, itemsPerPage: number = 4): void {
    this.isFetching = true;
    this.productionService.getCurrentProductions(pageNumber, itemsPerPage, this.selectedCategory)
      .subscribe((response: PaginatedResult<Array<ProductionDto>>) => {
        this.productions = response.result;
        this.isFetching = false;
        this.fetchFailed = false;
        this.pagination = response.pagination;
        this.isFirstPage = this.pagination?.currentPage === 1;
        this.isLastPage = this.pagination?.totalPages === this.pagination?.currentPage;

        this.commonService.setLastPage(this.pagination?.currentPage);
      }, error => {
        this.isFetching = false;
        this.fetchFailed = true;

        console.log('There was an error while processing Your request.');
      });
  }

  public getAllTechnologies(): void {
    this.technologyService.getAllTechnologies()
      .subscribe((response: Array<TechnologyForEditDto>) => {
        this.technologies = response;
      }, error => {
        this.isFetching = false;
        this.fetchFailed = true;

        console.log('There was an error while processing Your request.');
      });
  }
}
